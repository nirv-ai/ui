# NIRV.ai UI

## todo

- add yarn add tslib and importHelpers: true to tsconfig.json

## scripts

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## core components

- [create react app](https://create-react-app.dev/)
  - destructured named imports (ex. import { useState } from "react") which is the preferred style going into the future.
- [mui](https://mui.com/material-ui/)
- [mui icons](https://mui.com/material-ui/material-icons)
  - todo
- [react router](https://reactrouter.com/en/main)
  - continue: first handle logout in AppHeaderActions
  - continue: https://reactrouter.com/en/main/start/tutorial#updating-data
- [typescript](https://www.typescriptlang.org/)
- [typescript utility](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [yarn](https://yarnpkg.com)
  - yarn up -i -E '\*'
- [store2](https://github.com/nbubna/store)
- [react-spring](https://react-spring.dev/)
- [fontsource](https://fontsource.org/)
- [ramda](https://ramdajs.com/docs/)
- [defintely typed](https://www.typescriptlang.org/dt/search?search=)
- [mui system](https://mui.com/system/getting-started/usage/)
  - read through this for the SX prop and related components
- [husky & lint staged](https://laurieontech.com/posts/husky/)
  - [TODO: setup image lint on lintstaged](https://github.com/okonet/lint-staged#minify-the-images)
- [typescript eslint parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser#parseroptionsproject)

## FYI

- never `import blah from "."` for some reason create react app fails with weird `typescript cant import webpack module 0` or something like that
- `StoreManager` is made available at `window.StoreManager`, e.g. to clear store `StoreManager.store(false)`
