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

It's using [Netlify functions](https://docs.netlify.com/functions/overview/) in production, but in order to run the function on your machine, you can use the following command (on a different terminal session/window preferrably):

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
> If you are a maintainer of the project, please contact [ruizb](https://github.com/ruizb) to get the production values for these environment variables.

:warning: A note regarding files from the `src/functions` directory: you **can't** import files from outside `src/functions`. For example, importing a file from `src/client` inside `src/functions/collect-results.ts` won't work:

```ts
// src/functions/collect-results.ts

import { UserInfo } from '../client/models/userInfo'

const foo = (userInfo: UserInfo): void => {}
```

This is why we have (re)declared a more permissive [`UserInfo`](https://github.com/ruizb/echo/blob/master/src/functions/models/userInfo.ts) interface in the `src/functions/models` directory.

### Run the tests

You can use the following command to run all the unit tests:

```sh
npm test
```

These tests ensure that some pieces of logic from the app work as expected, such as the "random sounds selection" algorithm, or the CSV generation for the attachment file of the email containing the results.

### Deploy the app

You need an access to the project on [Netlify](https://www.netlify.com/) in order to deploy the changes from the `master` branch to the users.

## Use cases

### Change the text

The majority of the text is available in the [`index.html`](https://github.com/ruizb/echo/blob/master/src/client/index.html) file. You can change the existing text or add new paragraphs as you wish.

You can see an example that adds a new paragraph to the first screen [here](docs/change-text.gif).

### Change the sounds

If you wish to change the sounds used during the experiment, let it be update an existing one, adding a new one or deleting one, you can follow these steps:

1. Make your changes regarding the sounds in the [`src/client/sounds`](https://github.com/ruizb/echo/tree/master/src/client/sounds) directory.
2. Open the [`audioFilePath`](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts) file, then:
   - If you changed an existing sound, as long as the name is **exactly** the same (text case matters), you don't have to do anything special here.
   - If you added a new sound, you must first import this sound by [adding a new _import_](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts#L28) at the top of the file, e.g.:
     ```diff
     import whiteNoise from '../sounds/White Noise_1.wav'
     + import myNewSound from '../sounds/My New Sound.wav'
     ```
     Then, you need to add the imported sound to the [`audioFilePaths` list](https://github.com/ruizb/echo/blob/a7ce225d95238b622e2422cfb25035d9b298fad6/src/client/models/audioFilePath.ts#L33-L60), e.g. at the end of it:
     ```diff
     const audioFilePaths = [
       birds,
       blowingNose,
       ...,
       wheezing,
     +   myNewSound
     ]
     ```
     > :movie_camera: Demonstration available [here](docs/add-new-sound.gif).

   - If you deleted a sound, you have to remove both the _import_ line of this sound, and the imported "variable" from the `audioFilePaths` list. For example, if I choose to delete the "birds" sound, then I have to:
      1. Remove this line from the `audioFilePath.ts` module:
          ```diff
         - import birds from '../sounds/Birds_1.wav'
         import blowingNose from '../sounds/Blowing_nose1.wav'
          ```
     2. Remove this line from the `audioFilePaths` list of this module:
         ```diff
         const audioFilePaths = [
         -     birds,
             blowingNose,
             ...
         ```

### Change the user information form

#### Adding a new listening device

#### HTML

First, you can add a new option to the listening device section in the [`index.html`](https://github.com/ruizb/echo/blob/269eef9c0fbdd21be2a53e82263bcd472dc5f8f4/src/client/index.html#L45-L59) file:

```diff
<div class="grouped fields">
  <label>Qu'utilisez-vous pour écouter les sons de cette expérience ?</label>
  <div class="field">
    <div class="ui radio checkbox">
      <input type="radio" id="user-info_device-headset" value="headset" name="user-info_device" checked="" tabindex="0" class="hidden">
      <label for="user-info_device-headset">Casque</label>
    </div>
  </div>
  <div class="field">
    <div class="ui radio checkbox">
      <input type="radio" id="user-info_device-earphones" value="earphones" name="user-info_device" tabindex="0" class="hidden">
      <label for="user-info_device-earphones">Écouteurs</label>
    </div>
  </div>
+   <div class="field">
+       <div class="ui radio checkbox">
+         <input type="radio" id="user-info_device-speakers" value="speakers" name="user-info_device" tabindex="0" class="hidden">
+         <label for="user-info_device-speakers">Hauts-parleurs</label>
+       </div>
+     </div>
</div>
```

> :movie_camera: Demonstration available [here](docs/change-user-info-form.gif).

Make sure to use a different `id`, `value` and `for` values matching the new listening device. Here, we chose `speakers` as the new available option.

##### TypeScript

Next, you need to update the [`ListeningDevice`](https://github.com/ruizb/echo/blob/269eef9c0fbdd21be2a53e82263bcd472dc5f8f4/src/client/models/userInfo.ts#L3-L6) enum, as long as the [`isValidDevice`](https://github.com/ruizb/echo/blob/269eef9c0fbdd21be2a53e82263bcd472dc5f8f4/src/client/models/userInfo.ts#L18-L22) function in the `userInfo.ts` module:

```diff
const enum ListeningDevice {
  HeadSet = 'headset',
  EarPhones = 'earphones',
+   Speakers = 'speakers'
}
```

The value of this new entry must match the value you chose for the `value="speakers"` field earlier in the `index.html` file.

```diff
const isValidDevice = (device: unknown): device is ListeningDevice =>
  isString(device) &&
  ([
    ListeningDevice.HeadSet,
    ListeningDevice.EarPhones,
+     ListeningDevice.Speakers
  ] as string[]).indexOf(device) >= 0
```

> :movie_camera: Demonstration available [here](docs/change-listening-device.gif).

> :bulb: It's best to use a _select_ input instead of _radio buttons_ when there are more than 4-5 choices.

#### Adding a new field

Adding a new field to the first form requires a few steps.

##### HTML

The first thing to do is to add the HTML elements into `src/client/index.html` to expose this new field to the user. To do that, you can follow the example right below, where we add a new "ice cream" field.

```diff
<div class="grouped fields">
  <label>Avez-vous des acouphènes ? <i data-content="Sifflement d'oreille." class="info circle icon"></i></label>
  ...
</div>

+ <div class="grouped fields">
+   <label>Aimez-vous les glaces ?</label>
+   <div class="field">
+     <div class="ui radio checkbox">
+       <input type="radio" id="user-info_icecream-yes" value="yes" name="user-info_icecream" tabindex="0" class="hidden">
+       <label for="user-info_icecream-yes">Oui</label>
+     </div>
+   </div>
+   <div class="field">
+     <div class="ui radio checkbox">
+       <input type="radio" id="user-info_icecream-no" value="no" name="user-info_icecream" tabindex="0" class="hidden">
+       <label for="user-info_icecream-no">Non</label>
+     </div>
+   </div>
+   <div class="field">
+     <div class="ui radio checkbox">
+       <input type="radio" id="user-info_icecream-unknown" value="unknown" name="user-info_icecream" checked="" tabindex="0" class="hidden">
+       <label for="user-info_icecream-unknown">Je ne sais pas</label>
+     </div>
+   </div>
+ </div>

<div class="grouped fields">
  <label>Avez-vous une hypersensibilité auditive ? <i data-content="Les sons vous semblent-ils plus forts ou plus gênants que la normale ?" class="info circle icon"></i></label>
  ...
</div>
```

> :movie_camera: Demonstration available [here](docs/add-user-info-field-html.gif).

##### TypeScript

Now that the view/template is available, we need to gather the user's answer: in other words, get the value provided by the user via the input element he filled in. This is where we need to make a few changes in the TypeScript files:

- [`src/models/userInfo.ts`](https://github.com/ruizb/echo/blob/master/src/client/models/userInfo.ts)
   - Add a new property to the `UserInfo` interface:
      ```diff
      export interface UserInfo {
        age: number
        device: ListeningDevice
        hearingIssues: TriState
        tinnitus: TriState
      +   iceCream: TriState
        hearingHypersensibility: TriState
        soundsReactions: TriState
        soundsList: string[]
      }
     ```

   - Add a new verification step to the `isValidUserInfo` function:
     ```diff
     export const isValidUserInfo = (userInfo: unknown): userInfo is UserInfo =>
       isNull(userInfo) ||
       (isObject(userInfo) &&
         hasOwnProperty(userInfo, 'age') &&
         isNumber(userInfo.age) &&
         hasOwnProperty(userInfo, 'device') &&
         isValidDevice(userInfo.device) &&
         hasOwnProperty(userInfo, 'hearingIssues') &&
         isValidTriState(userInfo.hearingIssues) &&
         hasOwnProperty(userInfo, 'tinnitus') &&
         isValidTriState(userInfo.tinnitus) &&
     +     hasOwnProperty(userInfo, 'tinnitus') &&
     +     isValidTriState(userInfo.tinnitus) &&
         hasOwnProperty(userInfo, 'hearingHypersensibility') &&
         isValidTriState(userInfo.hearingHypersensibility) &&
         hasOwnProperty(userInfo, 'soundsReactions') &&
         isValidTriState(userInfo.soundsReactions) &&
         (userInfo.soundsReactions
           ? hasOwnProperty(userInfo, 'soundsList') && isArray(userInfo.soundsList)
           : true))
      ```

     > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-1.gif).

- [`src/client/views/userInfoForm.ts`](https://github.com/ruizb/echo/blob/master/src/client/views/userInfoForm.ts)
   - Add a new property to the `elements` object:
     ```diff
     const elements = {
       ...,
       tinnitus: () =>
         document.querySelector(
           'input[name="user-info_tinnitus"]:checked'
         ) as HTMLInputElement,
     +   iceCream: () =>
     +     document.querySelector(
     +       'input[name="user-info_icecream"]:checked'
     +     ) as HTMLInputElement,
       hypersensibility: () =>
         document.querySelector(
           'input[name="user-info_hypersensibility"]:checked'
         ) as HTMLInputElement,
       ...
     }
     ```

   - Add a new property to the `userInfo` object in the `handleUserInfoForm` function:
     ```diff
     const userInfo: UserInfo = {
       age: parseInt(elements.age.value, 10),
       device: elements.device.value as ListeningDevice,
       hearingIssues: elements.hearingIssues().value as TriState,
       tinnitus: elements.tinnitus().value as TriState,
     +   iceCream: elements.iceCream().value as TriState,
       hearingHypersensibility: elements.hypersensibility().value as TriState,
       soundsReactions,
       soundsList: soundsReactions
         ? elements.soundsReactionsList.value.split(',').map(_ => _.trim())
         : []
     }
     ```

     > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-2.gif).

- [`src/functions/models/userInfo.ts`](https://github.com/ruizb/echo/blob/master/src/functions/models/userInfo.ts)

   Add a new property to the `UserInfo` interface from the `src/functions/models` directory:
   ```diff
   export interface UserInfo {
     age: number
     device: string
     hearingIssues: string
     tinnitus: string
   +   iceCream: string
     hearingHypersensibility: string
     soundsReactions: string
     soundsList?: string[]
   }
   ```

   > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-3.gif).

- [`src/functions/helpers/transformResultsToCsv.ts`](https://github.com/ruizb/echo/blob/master/src/functions/helpers/transformResultsToCsv.ts)

   Extract the new property from the `UserInfo` parameter, and add a new row in the generated CSV:

   ```diff
   const generateUserInfoCsv = (
     {
       age,
       device,
       hearingIssues,
       tinnitus,
   +     iceCream,
       hearingHypersensibility,
       soundsReactions,
       soundsList
     }: UserInfo,
     soundVolume: number
   ): DestructuredCsv => [
     ['user-info-label', 'user-info-value'],
     ['age', age.toString()],
     ['device', device],
     ['hearing-issues', hearingIssues],
     ['tinnitus', tinnitus],
   +   ['icecream', iceCream],
     ['hearing-hypersens', hearingHypersensibility],
     ['sounds-reactions', soundsReactions],
     ['sounds-list', (soundsList ?? []).join('/')],
     ['sound-volume', soundVolume.toString()]
   ]
   ```

   > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-4.gif).

- [`src/functions/helpers/transformResultsToCsv.test.ts`](https://github.com/ruizb/echo/blob/master/src/functions/helpers/transformResultsToCsv.test.ts)

   Update the `userInfo` object with the new property, as well as the CSV string expectations from the unit tests:

   ```diff
   const userInfo: UserInfo = {
     age: 28,
     device: ListeningDevice.HeadSet,
     hearingIssues: 'no',
     tinnitus: 'no',
   +   iceCream: 'no',
     hearingHypersensibility: 'no',
     soundsReactions: 'no',
     soundsList: []
   }
   ```

   ```diff
         .toEqual(`user-info-label,user-info-value,noise-tolerance-label,noise-tolerance-value,filename,score1,score2,score3
   age,28,,,,,,
   device,headset,,,,,,
   hearing-issues,no,,,,,,
   tinnitus,no,,,,,,
   + icecream,no,,,,,,
   hearing-hypersens,no,,,,,,
   sounds-reactions,no,,,,,,
   sounds-list,,,,,,,
   sound-volume,0.31,,,,,,
   ,,statement-1,1,,,,
   ,,statement-2,2,,,,
   ,,statement-3,1,,,,
   ,,sounds-dislike,5,,,,
   ,,,,Birds_1.wav,33,35,31
   ,,,,Blowing_nose1.wav,76,68,73
   ,,,,Boire.wav,66,55,59`)
     })
   ```

   > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-5.gif).

- Finally, make sure that your changes didn't break anything by running `npm test`.

   > :movie_camera: Demonstration available [here](docs/add-user-info-field-ts-6.gif).

### Change the noise tolerance form

If you wish to add a new statement to the "noise tolerance" form, you can add it to the `statement` list from the [`src/client/views/noiseToleranceForm.ts](https://github.com/ruizb/echo/blob/master/src/client/views/noiseToleranceForm.ts) file:

```diff
const statements = [
+   `Les glaces me rendent heureux.`,
  `Certains sons me dérangent tellement que j’ai du mal à contrôler mes émotions.`,
  `Les sons déplaisants me donnent l’impression d’être submergé(e).`,
  `Je deviens anxieux à la simple pensée d’un son désagréable.`,
  ...
]
```

> :movie_camera: Demonstration available [here](docs/add-noise-tolerance-statement.gif).

---

> :information_source: Regarding the tech stack used for this project: I tried to keep it simple, with as fewer dependencies to libraries/frameworks as possible. I intentionally didn't use a component-based library such as React in order to make changes to the source code as easy as possible for researchers.
