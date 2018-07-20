## Reactful

A very opinionated React CLI. You can use it to generate an independent full-stack react application that's fully-configured to render on both client and server.

[![npm version](https://badge.fury.io/js/reactful.svg)](https://badge.fury.io/js/reactful)

This CLI requires Node 8.0 or greater, and it would work better if you have [Yarn](https://yarnpkg.com/en/) and [Git](https://git-scm.com/) on the machine.

### Install

    npm i -g reactful

Once installed, the package will have a global ```react``` command.

### Create New React App

    react new my-awesome-react-app-name

Once created, you'll see instructions on how to start it:

    cd my-awesome-react-app-name

    ### To start the app (for development):
    react start

    # The start command starts a watcher process
    # which will restart node/webpack on save

    ### Open the app in browser:
    react open

    # The app will be running on localhost:4242 by default

    ### To run tests:
    react test

    ### To build for production:
    react build

    ### To start the app for production:
    react prod

The generated app is completely independent from the reactful package. At this point you can part ways with the reactful package and do your own thing, but if you follow the patterns initialized by the package, you can use a few handy commands from the global react command.

### Create New Redux/React App

    react new-full my-awesome-redux-app-name

This will generate a Redux-configured full-stack React application with a state managed by Immutable.js. It will also render on both client and server.


### Update Existing React App

While in a React application that's created with this tool, you can always revert things back the default configurations with the init command. You can also use this command in an empty directory.

    cd my-awesome-react-app-name
    react init

If that directory already has files, reactful will ask you if you want to override them.

You can also use init-full to update an existing Redux/React app.

### Creating Components

- Create a New Component: ```react c ComponentName```
- Create a New Pure Component: ```react pc ComponentName```
- Create a New Function Component: ```react fc ComponentName```

All of these commands will also create a jest snapshot test for the generated component.


### License

Reactful is [MIT licensed](./LICENSE).
