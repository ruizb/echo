# Echo

This is a web app used by researchers from the [CNRS](https://en.wikipedia.org/wiki/French_National_Centre_for_Scientific_Research) (French National Center for Scientific Research) of Marseille, France.

Its goal is to collect some data regarding hearing conditions such as misophonia and hyperacusis.

## Getting started

This project requires the [nvm](https://github.com/nvm-sh/nvm) program in order to work. If you are a Windows user, you'll have to use an alternative such as [nvm-windows](https://github.com/coreybutler/nvm-windows) instead.

Once installed, use the following command at the root of the project to use the appropriate Node version:

```sh
nvm use
```

If the required Node version is not installed, the output of `nvm use` will be an "error" message telling you to install it via a command, such as `nvm install 12` for example.

### Install the dependencies

Once the `nvm use` command is successful, you can install the required dependencies by this project with the following command:

```sh
npm ci
```

### Run the app

If you want to run the app, you can use the following command:

```sh
npm start
```

Then open a new tab on your favorite browser at the following location: http://localhost:1234/index.html.

### Run the lambda function(s)

This app doesn't need a server in order to work. However, it needs a _serverless function_ to collect the results at the end of the experiment, and store them somewhere (e.g. attachment file to an email).

It's using [Netlify function](https://docs.netlify.com/functions/overview/) in production, but in order to run the function on your machine, you can use the following command (on a different terminal session/window):

```sh
npm run lambda:build && npm run lambda:serve
```

> :warning: The function won't work on your machine _as is_ because it requires a few environment variables used to connect to the [Sendgrid](https://sendgrid.com/) service, which allows the function to send the results via email.
> You can create a `sendgrid.env` file at the root of the project containing the following environment variables:
> ```sh
> export SENDGRID_API_KEY='api key from Sendgrid'
> export SENDGRID_FROM_EMAIL='whitelisted sender email'
> export SENDGRID_FROM_NAME='Echo'
> export SENDGRID_TO_EMAIL='target email address that will receive the results'
> ```
> If you are a maintainer of the project, please contact [ruizb](https://github.com/ruizb) to get the right values for these environment variables.

### Run the tests

You can use the following command to run all the unit tests:

```sh
npm test
```

These tests ensure that some pieces of logic from the app work as expected, such as the "random sounds selection" algorithm, or the CSV generation for the attachment file of the email containing the results.

### Deploy the app

You need an access to the project on [Netlify](https://www.netlify.com/) in order to deploy the changes from the `master` branch to the users.

## Use cases

### Change the sounds

If you wish to change the sounds used during the experiment, let it be update an existing one, adding a new one or deleting one, you can follow these steps to do so:

1. Make your changes regarding the sounds in the [`src/client/sounds`](https://github.com/ruizb/echo/tree/master/src/client/sounds) directory.
2. Open the [`audioFilePath`](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts) file, then:
   - If you changed an existing sound, as long as the name is **exactly** the same (text case matters), you don't have to do anything special here.
   - If you added a new sound, you must first import this sound by [adding a new _import_](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts#L28) at the top of the file, e.g.:
   ```diff
   import whiteNoise from '../sounds/White Noise_1.wav'
+   import myNewSound from '../sounds/My New Sound.wav'
   ```
   Then, you need to add the imported sound to the [`audioFilePaths` list](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts#L33-L60), e.g. at the end of it:
   ```diff
   const audioFilePaths = [
     birds,
     blowingNose,
     ...,
     wheezing,
+     myNewSound
   ]
   ```
   - If you deleted a sound, you have to remove both the _import_ line of this sound, and the imported "variable" from the `audioFilePaths` list. For example, if I choose to delete the "birds" sound, then I have to:
      1. Remove this line from the `audioFilePath.ts` module:
      ```diff
-     import birds from '../sounds/Birds_1.wav'
     import blowingNose from '../sounds/Blowing_nose1.wav'
      ```
     2. Remove this line from the `audioFilePaths` list of this module:
     ```diff
     const audioFilePaths = [
-         birds,
         blowingNose,
         ...
     ```

### Change the user information form

TODO

### Change the noise tolerance form

TODO

---

> :information_source: Regarding the tech stack used for this project: I tried to keep it simple, with as fewer dependencies to libraries/frameworks as possible. I intentionally didn't use a component-based library such as React in order to make changes to the source code as easy as possible for researchers.
