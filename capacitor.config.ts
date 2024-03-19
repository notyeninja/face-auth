import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.face-auth',
  appName: 'face-auth-ionic',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
