# Change Log

## :rocket: v 1.1.1.alpha

- Added GitHub pages support in `docs/`. Currently has the following pages:
  - Index (navigation links, features overview)
  - Quick Start (installing, usage)
  - Features (full list)
  - Documentation
- Improved build scripts
- Documentation pages are created with the `render.js` script in `docs/src`
    - Uses handlebars templates
    - Powered by Bluebird promises

## :rocket: v 1.1.0.alpha

- Improved build process
  - Switched from bash to gulp tasks
  - `dev` task watches for source code changes and selectively re-builds
    depending on what was changed
- Implemented the element selector (almost) fully
- Added an `.editorconfig`
- Split the main stylesheet into multiple sheets
