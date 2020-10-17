# SI Consult 
Aplikasi Konsultasi Chatting secara realtime untuk Mahasiswa dan Ketua Jurusan (Kajur) di STMIK Insan Pembangunan

![enter image description here](https://1.bp.blogspot.com/-xwl7oRpJB44/X4qWToYMJPI/AAAAAAAAHgU/p1TakGWit00CNVC06xL20YMtdwmrMGcWQCLcBGAsYHQ/s0/Screen+Shot+2020-10-17+at+13.57.36.png)

### Informasi
- Author:Serlina Utami
- Platform: Android
- Teknologi: Javascript, React, React Native, Firebase, Node JS
- Demo: https://play.google.com/store/apps/details?id=com.siconsult

### Cara menjalankan project
Karena Dibuat dengan React Native, usahakan perlajari dahulu basic-basic React Native di situs officialnya berikut https://reactnative.dev/ atau bisa juga dari channel-channel programming di youtube seperti channel Prawito Hudoro. Untuk installasinya pakai React Native CLI https://reactnative.dev/docs/environment-setup.

Clone dulu repositori ini:
```
git clone https://github.com/serlinautami/siconsult-app.git
```
Setelah selesai, masuk folder project-nya lalu jalankan perintah. berikut:
```
// jika pakai npm
npm install

// jika pakai yarn
yarn install
```
Catatan: Pastikan sudah terinstall Node JS, dan NPM versi terbaru. Rekomendasi untuk pakai `yarn` .

#### Menjalankan Aplikasi di Emulator
Pertama pastikan semua tersetup seperti Emulator Android studio dan environment react native nya (https://reactnative.dev/docs/environment-setup), Lalu jalankan perintah berikut:

```
// npm
npm start
npm android

// yarn
yarn start
yarn android

// npx
npx react-native start
npx react-native android
```
Untuk shortcut command line, saya sudah tuliskan dalam project pada file `package.json` bagian `script`.

Catatan: Pastikan emulator sudah diaktifkan mode debuging pada setting > developer option > USB Debugging

#### Menjalankan Aplikasi di Real Device
Cara menjalankan untuk real-device sama saja seperti yang diatas. Hanya saja pastikan kabel USB sudah tersambung ke PC dan pada Device sudah di aktifkan mode USB Debugging.

### Struktur Project
Untuk struktur project tersendiri menggunakan pattern [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)  dan beberapa fungsi dipisahkan berdasarkan library seperti [Redux](https://redux.js.org/) dan [Firebase](https://firebase.google.com/).  Pada project SI Consult akan terlihat seperti berikut ini:

![enter image description here](https://1.bp.blogspot.com/--N76g2b_ZJ0/X4qWqq2OMGI/AAAAAAAAHgk/VgX-7jB997IioGhqkutpUYTC9fHGecVkACLcBGAsYHQ/s0/Screen+Shot+2020-10-17+at+14.00.38.png)

Untuk mempelajari penerapan atomic design pada React dan React Native bisa mengunjungi channel Prawito Hudoro bagian video berikut ini https://www.youtube.com/watch?v=40vX41Qao5M



### Cara Setup Kredensial Project
Karena project ini memiliki dependensi dengan Firebase, pastikan mengerti terlebih dahulu cara setup firebase. Artikel ini mungkin bisa membantu: https://www.freecodecamp.org/news/react-native-firebase-tutorial/

1. Setup Firebase
Buka file `appConfig.js` di folder `src/configs/appConfig.js`, lalu cari pada bagian variabel `appEnvironment`.

2. Setup Google Service
Buka file `android/app/google-service.json` dan ganti dengan google service anda masing-masing. Jika belum tau cara mendapatkan google servicenya bisa baca tautan berikut: https://support.google.com/firebase/answer/7015592?hl=en

3. Setup Firebase Cloud Messaging (FCM)
Untuk ini cukup ganti FMC Token pada `appConfig.js` di folder `src/config/appConfig` pada variabel `appEnvironment.firebase.fcmkey`. https://developer.clevertap.com/docs/find-your-fcm-sender-id-fcm-server-api-key

4. Setup Web Laporan yang untuk dibagikan
Pada aplikasi ada fitur pelaporan yang bisa di share melalui URL. url ini adalah web yang sudah online dan di deploy. Untuk menggantinya bisa ubah pada variabel `reportUrl` pada file `appConfig.js`.
	- github: https://github.com/serlinautami/siconsult-web.git
	- preview: https://siconsult-web.vercel.app/laporan
	- deploy with: [Vercel.com](https://vercel.com/)
5. Setup User sebagai Ketua Jurusan
Fitur pada project ini masih dilakukan secara manual dengan inject data atau ubah data langsung pada database (Firebase Real-time Database). Langkahnya seperti berikut ini:
	- Register dulu user yang ingin di jadikan role nya sebagai `kajur`
	- Buka Firebase > Real-Time Database pada data bagian `users` cari UID user yang barusan di daftarkan lalu ubah rolenya dari `Mahasiswa` menjadi `kajur`.
	![enter image description here](https://1.bp.blogspot.com/-weQCwPPJ_hE/X4qazv4I1wI/AAAAAAAAHgw/e2hNqdLPLGc_8sfjKx-yRbfPoKgR3pGZgCLcBGAsYHQ/s0/Screen+Shot+2020-10-17+at+14.18.22.png)

### Cara Build menjadi Aplikasi
Cara build project menjadi apk bisa dengan perintah berikut ini:
```
// build to apk
cd android && ./gradlew assembleRelease 

// build to abb
cd android && ./gradlew bundleRelease

// own shortcut :)
npm apk-release
npm bundle-release

yarn apk-release
yarn bundle-relase 
```
Setelah itu, output build nya ada pada folder.`android/app/build/outputs` terdapat 2 folder lagi yaitu `apk` untuk build `.apk` dan bundle untuk build `.abb` (Bundle `.abb` digunakan untuk upload aplikasi yang ingin di rilis ke Google Playstore)


### Cara Rilis Aplikasi ke Google Playstore
Pada umumnya aplikasi yang dibuat dengan React Native, untuk perilisan ke playstore bisa coba baca sejenak dokumentasi dari situs officialnya disini: https://reactnative.dev/docs/signed-apk-android

Perihal Keystore mohon usahakan generate keystore sendiri dengan mengikuti langkah-langkah yang diberikan pada dokumentasi diatas.

Untuk upload ke Google Playstore, pastikan kita memiliki akun Google Play Console nya terlebih dahulu: https://play.google.com/apps/publish/signup/ dan ikuti langkah-langkahnya disana, jangan lupa siapkan Kartu Kredit / Visa untuk melakukan pembayaran registrasinya.

Setelah membuat akun, pastikan kita memiliki file `.apk` atau `.abb` yang sudah kita build pada project kita. Lalu kita tinggal melakukan persiapan perilisan terlebih seperti membuat icon, banner, screenshoot dan dll sebelum meluncurkan aplikasi. Artikel ini mungkin bisa membantu: https://medium.com/@positive.stud/how-to-publish-an-android-app-on-google-play-store-cd163919e4d2


Jika butuh informasi tambahan, hubungi via email:
serlinautami93@gmail.com :)
Terimakasih.

![enter image description here](https://1.bp.blogspot.com/-qaNme9DZmg4/X4qWTkbGdHI/AAAAAAAAHgY/dJvnVbEd2AA_BdtWS3vmoxkjyaP57T5TgCLcBGAsYHQ/s0/Screen+Shot+2020-10-17+at+13.57.53.png)
