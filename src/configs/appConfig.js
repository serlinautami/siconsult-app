const activeConfig = {
  environment: 'development',
  version: '1.0.0',
  developmentStatus: ''
};

const appEnvironment = {
  development: {
    firebase: {
      config: {
        apiKey: 'AIzaSyAM7aifeThs7ynf1Z_1R85ThfSzxHWzZGg',
        authDomain: 'consultation-ecc68.firebaseapp.com',
        databaseURL: 'https://consultation-ecc68.firebaseio.com',
        projectId: 'consultation-ecc68',
        storageBucket: 'consultation-ecc68.appspot.com',
        messagingSenderId: '287858581847',
        appId: '1:287858581847:web:3af7c569e059bfff085e12'
      },
      fcmkey:
        'AAAAQwW1YVc:APA91bESHwS2XVeg4esvuOq-9T65ZaZ8rW0Mujd4sairgzV-9Yp1t3HhclQ4K9g6OOUwhw8G5YHSFPn77R38oT4UJpmCAXzx_TDae9tTFiPKugNUsirqu9FByNM-DX3YUcwBgnCwJaWY'
    }
  },
  production: {
    firebase: {
      config: {
        apiKey: 'AIzaSyAM7aifeThs7ynf1Z_1R85ThfSzxHWzZGg',
        authDomain: 'consultation-ecc68.firebaseapp.com',
        databaseURL: 'https://consultation-ecc68.firebaseio.com',
        projectId: 'consultation-ecc68',
        storageBucket: 'consultation-ecc68.appspot.com',
        messagingSenderId: '287858581847',
        appId: '1:287858581847:web:3af7c569e059bfff085e12'
      },
      fcmkey:
        'AAAAQwW1YVc:APA91bESHwS2XVeg4esvuOq-9T65ZaZ8rW0Mujd4sairgzV-9Yp1t3HhclQ4K9g6OOUwhw8G5YHSFPn77R38oT4UJpmCAXzx_TDae9tTFiPKugNUsirqu9FByNM-DX3YUcwBgnCwJaWY'
    }
  }
};

const currentEnvironment = appEnvironment[activeConfig.environment];
const currentConfig = activeConfig;

export { currentEnvironment, currentConfig };
