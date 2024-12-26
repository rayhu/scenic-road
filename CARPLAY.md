# Supporting CarPlay and Android Auto in an Expo App

Supporting CarPlay and Android Auto in an Expo app is challenging because Expo’s managed workflow doesn’t currently support direct integration with these technologies. However, with a few adjustments, you can still achieve this goal by using the Expo Bare Workflow.

Here’s a guide on how to support CarPlay and Android Auto in your Expo app:

## Step-by-Step Guide

### 1. Eject to Bare Workflow

Expo’s managed workflow doesn’t support native modules required for CarPlay and Android Auto. You need to switch to the Bare Workflow.

1. In your project directory, run:

   ```bash
   npx expo eject
   ```

2. This will generate `ios` and `android` directories with native code you can modify.
3. You can now add native modules that support CarPlay and Android Auto.

### 2. Add CarPlay Support (iOS)

To support CarPlay, you need to modify the native iOS code in Xcode:

1. **Open Xcode**:

   - Open the `ios` project in Xcode (`ios/YourAppName.xcworkspace`).

2. **Enable CarPlay Entitlements**:

   - Select your project in the Project Navigator.
   - Go to **Signing & Capabilities** > **+ Capability**.
   - Add “CarPlay” to enable CarPlay support.

3. **Implement CarPlay App Template**:

   - CarPlay apps require a navigation app template or audio app template.
   - Create a class conforming to `CPTemplateApplicationSceneDelegate`.

   **Swift Example**:

   ```swift
   import CarPlay

   class CarPlayManager: NSObject, CPApplicationDelegate {
       func application(_ application: UIApplication, didConnectCarInterfaceController interfaceController: CPInterfaceController, to window: UIWindow) {
           print("CarPlay connected")
           // Set up CarPlay templates here
       }
   }
   ```

   **C Example**: 3. Implement CarPlay App Template:
   • CarPlay apps require a navigation app template or audio app template.
   • Create a class conforming to CPTemplateApplicationSceneDelegate.
   • Example setup in AppDelegate.m:

   ```c
   #include <stdio.h>
   #import <CarPlay/CarPlay.h>
   @interface AppDelegate () <CPApplicationDelegate>
   @end
   ```

   @implementation AppDelegate

   - (void)application:(UIApplication _)application didConnectCarInterfaceController:(CPInterfaceController _)interfaceController toWindow:(UIWindow \*)window {
     NSLog(@"CarPlay connected");
     void carPlayConnected() {
     printf("CarPlay connected\n");
     // Set up CarPlay templates here
     }

````

4. **Register CarPlay in Info.plist**:

 Add the following to your `Info.plist`:

   ```xml
   <key>UISupportedExternalAccessoryProtocols</key>
   <array>
     <string>com.apple.externalaccessory.protocol.carplay</string>
   </array>
   ```

### 3. Add Android Auto Support

To support Android Auto, modify the native Android code in Android Studio:

1. **Open the Android Project**:

   - Open the `android` directory in Android Studio.

2. **Add Dependencies**:

   Add the following dependencies in `app/build.gradle`:

   ```gradle
   implementation 'androidx.car.app:app:1.2.0'
   ```

3. **Create a Car App Service**:

   Create a service class for Android Auto:

   ```java
   public class MyCarAppService extends CarAppService {
       @Override
       public Session onCreateSession() {
           return new Session() {
               @Override
               public Screen onCreateScreen(Intent intent) {
                   return new MyCarScreen(getCarContext());
               }
           };
       }
   }
   ```

4. **Register the Service in AndroidManifest.xml**:

   ```xml
   <service
       android:name=".MyCarAppService"
       android:exported="true">
       <intent-filter>
           <action android:name="androidx.car.app.CarAppService" />
       </intent-filter>
   </service>
   ```

5. **Configure Metadata**:

   Add metadata to `AndroidManifest.xml`:

   ```xml
   <meta-data
       android:name="androidx.car.app.minCarApiLevel"
       android:value="1" />
   ```

### 4. Testing

- **For CarPlay**:

  - Use the CarPlay Simulator in Xcode under **Debug > Simulate Location > CarPlay**.

- **For Android Auto**:
  - Install the Android Auto Desktop Head Unit (DHU) to test Android Auto on your development machine.

## Limitations

- **Expo Managed Workflow**: CarPlay and Android Auto support isn’t possible without ejecting.
- **Native Code**: You will need to maintain native iOS and Android code.
````
