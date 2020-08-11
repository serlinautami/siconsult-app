import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { initFirebase } from '@modules';
import { messaging } from '@libraries';

initFirebase();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Background Message / Notification', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
