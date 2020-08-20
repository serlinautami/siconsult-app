import { auth, database } from '@libraries';
import { showLoading, getNotificationToken } from '@modules';
import { storeData, showError, removeData, showSuccess, getData } from '@utils';

/**
 * @name signUp()
 * @description
 * adalah fungsi untuk melakukan mendaftakan akun
 * dan menyimpannya ke database
 * @param {*} payload
 */
export async function signUp(payload = {}) {
  try {
    const { fullName, email, password, idNumber, gender, telphon } = payload;
    showLoading(true);

    if (!fullName) {
      throw new Error('Nama tidak boleh kosong!');
    }

    if (!idNumber) {
      throw new Error('Nomor ID atau NPM tidak boleh kosong!');
    }

    if (!gender) {
      throw new Error('Gender harus dipilih!');
    }

    if (!telphon) {
      throw new Error('Nomor Telepon tidak boleh kosong!');
    }

    if (!email) {
      throw new Error('Email tidak boleh kosong!');
    }

    if (!password) {
      throw new Error('Password tidak boleh kosong!');
    }

    const response = await auth().createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );

    const { user } = response;

    delete payload.password;

    const fcmtoken = await getNotificationToken();

    const data = {
      ...payload,
      uid: user.uid,
      fcmtoken
    };

    await database().ref(`users/${user.uid}/`).set(data);
    await storeData('user', data);
    showLoading(false);
    return data;
  } catch (err) {
    showLoading(false);
    if (err && err.code) {
      if (err.code === 'auth/invalid-email') {
        showError('Format email salah! silahkan cek kembali');
      }
      if (err.code === 'auth/weak-password') {
        showError('Password minimal harus memiliki 6 karakter');
      }

      if (err.code === 'auth/email-already-in-use') {
        showError(
          'Akun dengan email ini sudah terdaftar sebelumnya, silahkan gunakan email lain!'
        );
      }
    } else {
      showError(err.message);
    }
    throw err;
  }
}

/**
 * @name getUserByUid()
 * @description
 * adalah fungsi untuk mendapatkan data user
 * berdasarkan UID pengguna yang terdaftar
 * @param {*} uid
 * @param {*} params
 */
export const getUserByUid = async (uid, params = {}) => {
  try {
    // get user dari data user
    const datauser = await database().ref(`users/${uid}/`).once('value');
    if (datauser.val()) {
      return {
        ...datauser.val(),
        ...params
      };
    }

    throw null;
  } catch (err) {
    console.log('err', err);
    throw err;
  }
};

/**
 * @name signIn()
 * @description
 * adalah fungsi untuk masuk
 * @param {*} payload
 */
export async function signIn(payload = {}) {
  try {
    const { email, password } = payload;

    if (!email) {
      throw new Error('Email tidak boleh kosong!');
    }

    if (!password) {
      throw new Error('Password tidak boleh kosong!');
    }
    showLoading(true);
    const response = await auth().signInWithEmailAndPassword(
      payload.email,
      payload.password
    );

    const { user } = response;
    const data = await getUserByUid(user.uid);

    const fcmtoken = await getNotificationToken();

    await database().ref(`users/${user.uid}/`).update({ fcmtoken });

    const userData = {
      ...data,
      fcmtoken
    };

    await storeData('user', userData);

    showLoading(false);
    return data;
  } catch (err) {
    console.log(JSON.stringify(err));
    showLoading(false);
    if (err.code) {
      if (err.code === 'auth/wrong-password') {
        showError('Password Salah, mohon periksa kembali!');
      }
      if (err.code === 'auth/user-not-found') {
        showError(
          'Akun tidak ditemukan, silahkan melakukan pendaftaran terlebih dahulu!'
        );
      }
    } else {
      showError(err.message);
    }
    throw err;
  }
}

/**
 * @name signOut()
 * @description
 * adalah fungsi untuk keluar dari aplikasi dan firebase
 */
export const signOut = async () => {
  try {
    showLoading(true);
    await auth().signOut();

    const user = await getData('user');
    await database().ref(`users/${user.uid}/`).update({ fcmtoken: null });

    removeData('user');
    showLoading(false);
    return true;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};

/**
 * updateProfile() adalah fungsi untuk mengupdate informasi profil
 * pengguna
 */
export const updateProfile = async (payload = {}) => {
  try {
    const { fullName, gender, telphon } = payload;

    if (!fullName) {
      throw new Error('Nama tidak boleh kosong!');
    }

    if (!gender) {
      throw new Error('Gender harus dipilih!');
    }

    if (!telphon) {
      throw new Error('Nomor Telepon tidak boleh kosong!');
    }

    showLoading(true);
    await database().ref(`users/${payload.uid}/`).update(payload);
    await storeData('user', payload);
    showLoading(false);
    return payload;
  } catch (err) {
    showLoading(false);
    showError(err && err.message ? err.message : 'Terjadi Masalah');
    throw err;
  }
};

/**
 * @name sendPasswordResetEmail()
 * @description
 * adalah fungsi untuk melakukan peresetan kata sandi
 * @param {email} email
 */
export const sendPasswordResetEmail = async function (email) {
  try {
    showLoading(true);
    await auth().sendPasswordResetEmail(email);
    showLoading(false);
    showSuccess('Sukses, cek email untuk reset password!');
    return true;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};
