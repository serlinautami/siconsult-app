/**
 * Untuk penamaan lebih baik pakai konstanta.
 * alasan: untuk mengurangi typo atau dev error
 */
const routeConstant = {
  HOME: 'Home',
  LOGIN: 'Login',
  SPLASH: 'Splash',
  LAPORAN: 'Laporan',
  REGISTER: 'Register',
  MESSAGES: 'Messages',
  CHATTING: 'Chatting',
  GETSTARTED: 'GetStarted',
  UPLOADPHOTO: 'UploadPhoto',
  USERPROFILE: 'UserProfile',
  CHOOSEMASALAH: 'ChooseMasalah',
  UPDATEPROFILE: 'UpdateProfile',
  DETAILMASALAH: 'DetailMasalah',
  FORMMASALAH: 'FormMasalah',
  FORGOTPASSWORD: 'ForgotPassword',
  DASHBOARD: 'Dashboard',
  MESSAGEGROUP: 'MessageGroup',
  DAFTARLAPORAN: 'DaftarLaporan',
  DETAILLAPORAN: 'DetailLaporan',
  DAFTARMAHASISWA: 'DaftarMahasiswa',
  DAFTARMASALAH: 'DaftarMasalah',
  DETAILMAHASISWA: 'DetailMahasiswa',
  RIWAYATKONSULTASI: 'RiwayatKonsultasi',
  ABOUTAPP: 'AboutApp'
};

const notificationConstant = {
  NOTIF_APP_OPEN: 'appOpen',
  NOTIF_APP_CLOSE: 'appClose',
  NOTIF_APP_MINIMIZE: 'appMinimize'
};

export { routeConstant, notificationConstant };
