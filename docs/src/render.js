// @ts-check

const hbs = require('handlebars')
const path = require('path')
// @ts-ignore
const Promise = require('bluebird')
const fs = require('fs')
const [readdir, readFile, access, writeFile] = [
  fs.readdir,
  fs.readFile,
  fs.access,
  fs.writeFile
].map(func => Promise.promisify(func))

// Directory for rendered pages
const OUT_DIR_PATH = path.join(__dirname, '..')
// Location of handlebars templates
const TEMPLATE_SOURCE_DIR = __dirname
// Location of JSON data
const TEMPLATE_DATA_DIR = path.join(__dirname, 'data')

console.log(`Template path: ${TEMPLATE_SOURCE_DIR}`)
console.log(`Data path: ${TEMPLATE_DATA_DIR}`)
console.log(`Output path: ${OUT_DIR_PATH}`)

function raise(msg) {
  return err => {
    console.error(msg)
    console.error(err)
  }
}

let sources_async = () => readdir(TEMPLATE_SOURCE_DIR, 'utf-8')
  .filter(f => {
    let split_file = f.split('.')
    // templates must end in .hbs. Also, ignore partials, which start with '_'
    return split_file[split_file.length - 1] === 'hbs' && split_file[0] !== '_'
  })
  .map(f => {
    return readFile(path.join(TEMPLATE_SOURCE_DIR, f), 'utf-8')
      .then(contents => {
        return { page: f.split('.')[0], value: contents }
      }) 

  })
  .reduce((source_map, source) => {
    source_map[source.page] = source.value
    return source_map
  }, Object.create(null))
  .catch(raise("Error thrown while reading templates"))

// Read in the JSON files containing each page's data
let data_async = () => readdir(TEMPLATE_DATA_DIR, 'utf-8')
  .map(d => { // get the raw data from the file
    return readFile(path.join(TEMPLATE_DATA_DIR, d), 'utf-8')
      .then(contents => { // parse the data into an object
        return JSON.parse(contents)
      }).catch(err => { // error thrown when reading file, default to empty object
        console.error('Error thrown while reading JSON file')
        console.error(err)
        return {}
      })
      .then(data_obj => {
        return { page: d.split('.')[0], value: data_obj }
      })
  })
  .reduce((data_map, data) => {
    data_map[data.page] = data.value
    return data_map
  }, Object.create(null))
  .catch(raise('Error thrown while parsing template data'))

// const pages = []
Promise.join(sources_async(), data_async(), async (sources, data) => {
  for (let page_name in sources) {
    let template = hbs.compile(sources[page_name])
    let page = template(data[page_name] || {})
    let page_path = path.join(OUT_DIR_PATH, page_name + '.html')
    // pages.push(await writeFile(page_path, page))
    await writeFile(page_path, page)
   
  }
})

// Promise.all(pages)
// .then(() => console.log('Successfully saved all rendered pages'))
// .catch(raise('Error thrown while saving pages.'))
