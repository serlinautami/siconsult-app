import { firebase, AsyncStorage, messaging } from '@libraries';
import { currentEnvironment } from '@configs';

/**
 * setNotificationToken() adalah fungsi untuk
 * menyimpan token notifikasi ke local storage
 * @param {*} token
 */
export const setNotificationToken = async (token = '') => {
  try {
    await AsyncStorage.setItem('fcmtoken', token);
    return true;
  } catch (err) {
    console.log('setNotificationToken error ==>', err);
  }
};

/**
 * getNotificationToken() adalah fungsi untuk
 * mendapatkan token notifikasi dari local storage
 */
export const getNotificationToken = async () => {
  try {
    const token = await AsyncStorage.getItem('fcmtoken');
    return token;
  } catch (err) {
    console.log('getNotificationToken error ==>', err);
  }
};

/**
 * removeNotificationToken() fungsi untuk
 * menghapus token notifikasi dari async storage
 */
export const removeNotificationToken = async () => {
  try {
    await AsyncStorage.removeItem('fcmtoken');
    return true;
  } catch (err) {
    console.log('removeNotificationToken error ==>', err);
  }
};

/**
 * initFirebase() adalah function untuk
 * inisiasi layanan firebase pada aplikasi
 */
export async function initFirebase() {
  if (firebase.apps.length === 0) {
    await firebase.initializeApp(currentEnvironment.firebase.config);
  }
}
