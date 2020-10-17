const activeConfig = {
  environment: 'production',
  version: '1.0.7',
  developmentStatus: '',
  appName: 'SI Consult',
  reportUrl: 'https://siconsult-report.vercel.app/laporan',
  appDescription:
    'Aplikasi Konsultasi Mahasiswa dengan Ketua Jurusan (Kajur) secara real-time',
  privacyPolicy: 'https://siconsult-web.vercel.app/kebijakan-privasi',
  playstore: 'https://play.google.com/store/apps/details?id=com.siconsult',
  author: 'Serlina Utami',
  campus: 'STMIK Insan Pembangunan',
  developer1: {
    name: 'IP Adiyanto',
    number: '+6285213677334',
    wa: 'https://wa.me/+6285213677334'
  },
  developer2: {
    name: 'IP Bayu',
    number: '+6287878140460',
    wa: 'https://wa.me/+6287878140460'
  }
};

const appEnvironment = {
  development: {
    firebase: {
      config: {
        apiKey: 'AIzaSyCeLTe2h1P5SI7vAA2w-R-2rOv3ENsR5Ds',
        authDomain: 'si-consult-stmik-pembangunan.firebaseapp.com',
        databaseURL: 'https://si-consult-stmik-pembangunan.firebaseio.com',
        projectId: 'si-consult-stmik-pembangunan',
        storageBucket: 'si-consult-stmik-pembangunan.appspot.com',
        messagingSenderId: '428698717024',
        appId: '1:428698717024:web:dfa3919e2549fdad0bec05'
      },
      fcmkey:
        'AAAAY9BvS2A:APA91bEgBVXxgKuH4YZH6tGX1780pqG02b_STYvtSkftOSxA-plfBGglBW_ceGhX3EXByy7KvgUgVj2eJY2HCOlfRkpE8izoEz3rGbtx4r49vQZ2KnbbGE-jYkn7esqi0M-gT7nu6fzG'
    }
  },
  production: {
    firebase: {
      config: {
        apiKey: 'AIzaSyCeLTe2h1P5SI7vAA2w-R-2rOv3ENsR5Ds',
        authDomain: 'si-consult-stmik-pembangunan.firebaseapp.com',
        databaseURL: 'https://si-consult-stmik-pembangunan.firebaseio.com',
        projectId: 'si-consult-stmik-pembangunan',
        storageBucket: 'si-consult-stmik-pembangunan.appspot.com',
        messagingSenderId: '428698717024',
        appId: '1:428698717024:web:dfa3919e2549fdad0bec05'
      },
      fcmkey:
        'AAAAY9BvS2A:APA91bEgBVXxgKuH4YZH6tGX1780pqG02b_STYvtSkftOSxA-plfBGglBW_ceGhX3EXByy7KvgUgVj2eJY2HCOlfRkpE8izoEz3rGbtx4r49vQZ2KnbbGE-jYkn7esqi0M-gT7nu6fzG'
    }
  }
};

const currentEnvironment = appEnvironment[activeConfig.environment];
const currentConfig = activeConfig;

export { currentEnvironment, currentConfig };
