import { Loading, Network } from '@components';

import {
  React,
  FlashMessage,
  NavigationContainer,
  Provider,
  useSelector,
  YellowBox,
  useEffect,
  useCallback,
  Notifications,
  messaging,
  Platform,
  firebase
} from '@libraries';
import { AppRoute } from '@routes';
import { store, setNotificationToken } from '@modules';
import { notificationConstant } from '@utils';

const NotificationContainer = ({ children, ...props }) => {
  const initiateNotificationChannel = () => {
    Notifications.android.setNotificationChannel({
      channelId: 'siconsult',
      name: 'Siconsult',
      description: 'Message'
    });
  };

  const displayOpenAppNotification = newNotification => {
    return Notifications.postLocalNotification({
      body: newNotification.body,
      data: newNotification.data,
      title: newNotification.title
    });
  };

  const handleNotification = useCallback(async (notification, type) => {
    if (type === notificationConstant.NOTIF_APP_OPEN) {
      displayOpenAppNotification({ ...notification, type });
    }

    if (type === notificationConstant.NOTIF_APP_CLOSE) {
      displayOpenAppNotification({ ...notification, type });
    }

    if (type === notificationConstant.NOTIF_APP_MINIMIZE) {
      displayOpenAppNotification({ ...notification, type });
    }
  }, []);

  const initNotificationListenersClose = useCallback(async () => {
    const notificationOpen = await messaging().getInitialNotification();

    if (notificationOpen) {
      const notification = {
        data: notificationOpen.data,
        ...notificationOpen.notification
      };
      console.log('initNotificationListenersClose:', notification);
      handleNotification(notification, notificationConstant.NOTIF_APP_CLOSE);
    }
  }, [handleNotification]);

  const getNotificationToken = async () => {
    try {
      const token = await messaging().getToken();
      await setNotificationToken(token);
      console.log('fcmtoken ==>', token);
      return token;
    } catch (err) {
      console.log('getNotificationToken err ==>', err);
    }
  };

  // request new permission for notification
  const requestNotificationPermission = useCallback(async () => {
    try {
      if (Platform.OS === 'ios') {
        await messaging().registerDeviceForRemoteMessages();
      }
      await messaging().requestPermission();
      return getNotificationToken();
    } catch (error) {
      // user rejected permission
      console.log('requestNotificationPermission err ==>', error);
    }
  }, []);

  // check existing permission in notification
  const checkNotificatonPermission = useCallback(async () => {
    const enabled = await messaging().hasPermission();
    if (enabled) {
      return getNotificationToken();
    }
    return requestNotificationPermission();
  }, [requestNotificationPermission]);

  // init notification
  useEffect(() => {
    Notifications.registerRemoteNotifications();
    checkNotificatonPermission();
    initNotificationListenersClose();

    const openAppListener = messaging().onMessage(remoteMessage => {
      const notification = {
        data: remoteMessage.data,
        ...remoteMessage.notification
      };
      console.log('messaging().onMessage:', notification);
      handleNotification(notification, notificationConstant.NOTIF_APP_OPEN);
    });

    Notifications.events().registerNotificationOpened(
      (notification, completion) => {
        console.log('Notification opened:', notification);
        handleNotification(
          notification,
          notificationConstant.NOTIF_APP_MINIMIZE
        );
        completion();
      }
    );

    // Notifications.events().registerNotificationReceivedForeground(
    //   (notification, completion) => {
    //     console.log('Notification received in foreground:', notification);
    //     handleNotification(notification, notificationConstant.NOTIF_APP_OPEN);
    //     completion();
    //   }
    // );

    Notifications.events().registerNotificationReceivedBackground(
      (notification, completion) => {
        console.log('Notification Received - Background', notification.payload);
        handleNotification(
          notification,
          notificationConstant.NOTIF_APP_MINIMIZE
        );
        completion();
      }
    );

    const minimizeAppListener = messaging().onNotificationOpenedApp(
      remoteMessage => {
        const notification = {
          data: remoteMessage.data,
          ...remoteMessage.notification
        };
        console.log('messaging opened:', notification);
        handleNotification(
          notification,
          notificationConstant.NOTIF_APP_MINIMIZE
        );
      }
    );

    return () => {
      openAppListener();
      minimizeAppListener();
    };
  }, [
    checkNotificatonPermission,
    handleNotification,
    initNotificationListenersClose
  ]);

  return <React.Fragment>{children}</React.Fragment>;
};

const MainApp = () => {
  const stateGlobal = useSelector(state => state);
  YellowBox.ignoreWarnings(['Setting a timer']);
  return (
    <NotificationContainer>
      <NavigationContainer>
        <AppRoute />
      </NavigationContainer>
      <FlashMessage position="top" />
      <Network />
      {stateGlobal.loading && <Loading />}
    </NotificationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

export default App;
