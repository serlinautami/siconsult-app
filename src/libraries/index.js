import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  YellowBox,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Button,
  Platform,
  AppState,
  BackHandler,
  Linking,
  Share
} from 'react-native';
import Netinfo from '@react-native-community/netinfo';
import firebase from 'firebase/app';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-community/async-storage';
import FlashMessage from 'react-native-flash-message';
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-community/picker';
import moment from 'moment';
import { Notifications } from 'react-native-notifications';
import 'moment/locale/id';
import 'firebase/auth';
import 'firebase/database';
import messaging from '@react-native-firebase/messaging';

const database = firebase.database;
const auth = firebase.auth;

export {
  React,
  firebase,
  PropTypes,
  AsyncStorage,
  FlashMessage,
  ImagePicker,
  Picker,
  moment,
  View,
  TouchableOpacity,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  YellowBox,
  Alert,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Button,
  Notifications,
  Platform,
  AppState,
  BackHandler,
  Linking,
  auth,
  messaging,
  Netinfo,
  Share,
  database
};

export * from 'react';
export * from 'redux';
export * from 'react-redux';
export * from '@react-navigation/bottom-tabs';
export * from '@react-navigation/native';
export * from '@react-navigation/stack';
export * from 'react-native-flash-message';
