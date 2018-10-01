## Reactful

A very opinionated React CLI. You can use it to generate an independent
full-stack react application that's fully-configured to render on both client
and server.

[![npm version](https://badge.fury.io/js/reactful.svg)](https://badge.fury.io/js/reactful)

This CLI requires Node 8.0 or greater, and it would work better if you have
[Yarn](https://yarnpkg.com/en/) and [Git](https://git-scm.com/) on the machine.

### Install

    npm i -g reactful

Once installed, the package will have a global `reactful` command.

### Create New React App

    reactful new my-awesome-react-app-name

Once created, you'll see instructions on how to start it:

    cd my-awesome-react-app-name

    ### To start the app (for development):
    reactful start

    # The start command starts a watcher process
    # which will restart node/webpack on save

    ### Open the app in browser:
    reactful open

    # The app will be running on localhost:4242 by default

    ### To run tests:
    reactful test

    ### To build for production:
    reactful build

    ### To start the app for production:
    reactful prod

The generated app is completely independent from the reactful package. At this
point you can part ways with the reactful package and do your own thing, but if
you follow the patterns initialized by the package, you can use a few handy
commands from the global react command.

### Update Existing React App

While in a React application that's created with this tool, you can always
revert things back the default configurations with the init command. You can
also use this command in an empty directory.

    cd my-awesome-react-app-name
    reactful init

If that directory already has files, reactful will ask you if you want to
override them.

### Creating Components

- Create a New Component: `reactful c ComponentName`
- Create a New Pure Component: `reactful pc ComponentName`
- Create a New Function Component: `reactful fc ComponentName`

All of these commands will also create a jest snapshot test for the generated
component.

### License

Reactful is [MIT licensed](./LICENSE).
