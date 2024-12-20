# Scenic Road

Scenic Road is an application designed to find points of interests, and read aloud the road stories.

This project is based on the expo.

## Developer Getting Started

Install dependencies

   ```bash
   npm install
   ```

The mobile app will authenticate to the scenic-server and receive temporary API keys for OpenAI, Anthropic and Google.

Sample content of env.js can be found in the source code repo.

### Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npx expo start
```

### Step 2: Start your Application

## Troubleshooting

To open the developer menu in an Expo app, which allows you to access options like "Debug Remote JS," you can use the following methods depending on your device or emulator:

### On a Physical Device

Shake the Device: This will bring up the developer menu at the bottom of the screen.

### On an Android Emulator

Press Ctrl + M: This keyboard shortcut will open the developer menu.

### On an iOS Simulator

Press Cmd + D: This keyboard shortcut will open the developer menu.

### Developer Menu Options

Once the developer menu is open, you can select "Debug Remote JS" to open the JavaScript debugger in your default web browser, typically Chrome. This will allow you to use Chrome DevTools to debug your JavaScript code.

### Additional Options in the Developer Menu

Reload: Reload the app to see changes.
Toggle Inspector: Open the React Native Inspector to examine UI elements.
Toggle Performance Monitor: View performance metrics for your app.

By using these methods, you can easily access the developer menu and utilize the debugging tools available in Expo. If you have any more questions or need further assistance, feel free to ask!

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

## TODO list
