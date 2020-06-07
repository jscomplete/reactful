## Reactful

An opinionated practical CLI for developing full-stack server-rendered React applications. You can use it to generate an independent React application (optionally with TypeScript) that's fully-configured to render on both client and server. You can also use it to render simple template applications (without SSR).

[![npm version](https://badge.fury.io/js/reactful.svg)](https://badge.fury.io/js/reactful)

This CLI requires Node >= 10.x.

### Creating New App

```sh
npx reactful create my-awesome-react-app
```

This will create a new reactful project using the default template (webpack, babel, express, with support for SSR).

You can also use a few different templates using:

```sh
npx reactful create -t <template_name> my-awesome-react-app
```

Supported templates:

- **default**: A babel-based configuration (with support for SSR and production buid)
- **typescript**: A typescript-based configuration (with support for SSR and production build)
- **simple**: A simple Parcel-based configuration (no SSR, no production config)

Once a project is created you can use the "start" command to start it in development mode:

```sh
cd my-awesome-react-app

# To start the dev server and dev bundler watchers
npx reactful start
```

On the "default" and "typescript" templates, the "start" command will run 2 commands concurrently, you can also run them separately with:

```sh
npx reactful dev:server # runs on port 1234 by default

npx reactful dev:bundler # this will re-bundle on save
```

To run all the tests:

```sh
npx reactful test
```

To build and start the app in production:

```sh
npx reactful build:all

npx reactful prod:start
```

If you keep the folder structure initialized by the package, you can use reactful to generate component files. For example:

```sh
npx reactful gc ComponentName   # Create a new function component
npx reactful gcc ComponentName  # Create a new class component
```

These commands will also create a jest snapshot test for the generated component.

### Updating Existing React App

While in a React application that's created with this tool, you can always revert things back to the default configurations with the `init` command. You can also use this command in an empty directory.

```sh
cd my-awesome-react-app
npx reactful init
```

If that directory already has files, reactful will ask you if you want to override them.

### License

Reactful is [MIT licensed](./LICENSE).
