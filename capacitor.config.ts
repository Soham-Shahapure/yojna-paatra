import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cep.yojnapaatra',
  appName: 'YojnaPaatra',
  webDir: 'build',
  plugins: {
    SplashScreen: {
      launchShowDuration: 500,        // Holds the native screen just long enough
      launchAutoHide: true,
      launchFadeOutDuration: 400,     // Smooth crossfade into your React app
      backgroundColor: "#ffffffff",   // Pure white background (8-digit Hex)
      showSpinner: false,             // Hides the default loading circle
      androidSplashResourceName: "splash"
    }
  }
};

export default config;