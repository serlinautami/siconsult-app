/* eslint-disable prettier/prettier */
import {
  Home,
  Login,
  Splash,
  Laporan,
  Register,
  Messages,
  Chatting,
  UserProfile,
  GetStarted,
  UploadPhoto,
  UpdateProfile,
  ChooseMasalah,
  DetailMasalah,
  FormMasalah,
  ForgotPassword,
  MessagesGroup,
  DaftarLaporan,
  DetailLaporan,
  DaftarMahasiswa,
  DaftarMasalah,
  DetailMahasiswa,
  RiwayatKonsultasi,
  AboutApp
} from '@pages';

import { Dashboard } from './tabs';
import { routeConstant } from '@utils';


/**
 * Route option untuk global route,
 */
const routeOptions = {
  headerShown: false
};

const initialParams = {};


/**
 * Route List, semua halaman akan terdaftar sebagai route disini
 */

const mainRoutes = [
  { name: routeConstant.HOME, component: Home, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.LOGIN, component: Login, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.SPLASH, component: Splash, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.LAPORAN, component: Laporan, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.MESSAGES, component: Messages, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.REGISTER, component: Register, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.CHATTING, component: Chatting, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.GETSTARTED, component: GetStarted, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.USERPROFILE, component: UserProfile, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.UPLOADPHOTO, component: UploadPhoto, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.UPDATEPROFILE, component: UpdateProfile, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.CHOOSEMASALAH, component: ChooseMasalah, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DETAILMASALAH, component: DetailMasalah, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.FORMMASALAH, component: FormMasalah, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.FORGOTPASSWORD, component: ForgotPassword, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DASHBOARD, component: Dashboard, options: { ...routeOptions }, initialParams: {...initialParams, isAdmin: false} },
  { name: routeConstant.MESSAGEGROUP, component: MessagesGroup, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DAFTARLAPORAN, component: DaftarLaporan, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DETAILLAPORAN, component: DetailLaporan, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DAFTARMAHASISWA, component: DaftarMahasiswa, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DETAILMAHASISWA, component: DetailMahasiswa, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.DAFTARMASALAH, component: DaftarMasalah, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.RIWAYATKONSULTASI, component: RiwayatKonsultasi, options: { ...routeOptions }, initialParams: {...initialParams} },
  { name: routeConstant.ABOUTAPP, component: AboutApp, options: { ...routeOptions }, initialParams: {...initialParams} }
];

export default mainRoutes;
