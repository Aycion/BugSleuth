# Change Log

## :rocket: v1.1.3.alpha

- Small changes to feedback form
- Started `PinManager`
- Fixed typo in `docs/src/render.js`

## :rocket: v1.1.2.alpha

- Added partials support for documentation pages
- Changed the favicon to a more suitable picture

## :rocket: v1.1.1.alpha

- Added GitHub pages support in `docs/`. Currently has the following pages (Note: Pages are not completed):
  - Index (navigation links, features overview)
  - Quick Start (installing, usage)
  - Features (full list)
  - Documentation
- Improved build scripts
- Documentation pages are created with the `render.js` script in `docs/src`
    - Uses handlebars templates
    - Powered by Bluebird promises

## :rocket: v1.1.0.alpha

- Improved build process
  - Switched from bash to gulp tasks
  - `dev` task watches for source code changes and selectively re-builds
    depending on what was changed
- Implemented the element selector (almost) fully
- Added an `.editorconfig`
- Split the main stylesheet into multiple sheets
