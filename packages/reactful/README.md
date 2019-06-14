## Reactful

An opinionated CLI for full-stack server-rendered React applications. You can use it to generate an independent React application that's fully-configured to render on both client and server.

[![npm version](https://badge.fury.io/js/reactful.svg)](https://badge.fury.io/js/reactful)

This CLI requires Node >= 8.x.

### Creating New App

```sh
npx reactful my-awesome-react-app
```

Once created, you'll see instructions on how to use it:

```sh
cd my-awesome-react-app

# To start the app for development (watchers for node/webpack)
npm start

# To open the app in browser (default is localhost:4242)
npx reactful open

# To run all tests
npm test

# To build for production
npm run build-all

# To start the app for production
npm run prod-start
```

The generated app is completely independent from the reactful package. At this point you can part ways with the package and do your own thing.

If you keep the folder structure initialized by the package, you can use a few handy commands. For example:

- Create a New (Function) Component: `npx reactful c ComponentName`
- Create a New Class Component: `npx reactful cc ComponentName`
- Create a New Pure Component: `npx reactful pc ComponentName`

All of these commands will also create a jest snapshot test for the generated component.

### Updating Existing React App

While in a React application that's created with this tool, you can always revert things back to the default configurations with the `init` command. You can also use this command in an empty directory.

```sh
cd my-awesome-react-app
npx reactful init
```

If that directory already has files, reactful will ask you if you want to override them.

### License

Reactful is [MIT licensed](./LICENSE).
