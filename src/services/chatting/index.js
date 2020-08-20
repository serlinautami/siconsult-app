import { database, moment } from '@libraries';
import { showLoading } from '@modules';
import { showError } from '@utils';
import { getUserByUid } from '../authentication';
import { currentEnvironment } from '@configs';

export const sendNotification = async (
  to = '',
  notification = {},
  data = null
) => {
  try {
    const requestPayload = {
      to,
      priority: 'high',
      soundName: 'default',
      notification,
      ...(data && data)
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${currentEnvironment.firebase.fcmkey}`
      },
      body: JSON.stringify(requestPayload)
    });

    return response;
  } catch (err) {
    throw err;
  }
};

/**
 * getDataKajur() adalah fungsi untuk
 * mendapatkan user dengan role kajur
 */
export const getDataKajur = async function () {
  try {
    // get user dari data role
    const dataKajur = await database()
      .ref('users/')
      .orderByChild('role')
      .equalTo('kajur')
      .once('value');

    if (!dataKajur || !dataKajur.val()) {
      showError(
        'Tidak bisa memulai konsultasi. Ketua jurusan belum terdaftar pada aplikasi!'
      );
      throw {
        message:
          'Tidak bisa memulai konsultasi. Ketua jurusan belum terdaftar pada aplikasi!'
      };
    }

    // mapping data object to array
    let userKajur = {};
    Object.keys(dataKajur.val()).forEach(kajurUid => {
      userKajur = {
        ...dataKajur.val()[kajurUid]
      };
    });

    return userKajur;
  } catch (err) {
    showError(err.message);
    throw err;
  }
};

/**
 * getChatting() adalah fungsi untuk mendapatkan pesan chatting
 * @param {*} senderUid
 * @param {*} receiverUid
 * @param {*} callback
 */
export const getChatting = function ({
  senderUid,
  receiverUid,
  callback,
  itemMasalahId,
  chatId = null
}) {
  const chatID = chatId
    ? chatId
    : `${senderUid}_${receiverUid}_${itemMasalahId}`;
  const urlFirebase = `chatting/${chatID}/allChat/`;

  const chatListener = database()
    .ref(urlFirebase)
    .on('value', snapshot => {
      if (snapshot.val()) {
        const dataSnapshot = snapshot.val();
        let allDataChat = [];
        Object.keys(dataSnapshot).map(key => {
          const dataChat = dataSnapshot[key];
          let newDataChat = [];

          Object.keys(dataChat).map(itemChat => {
            newDataChat.push({
              id: itemChat,
              data: dataChat[itemChat]
            });
          });

          // newDataChat = newDataChat.reverse();

          allDataChat.push({
            id: key,
            data: newDataChat
          });
        });

        // allDataChat = allDataChat.reverse();

        if (callback) {
          callback(allDataChat);
        }
      }
    });

  return chatListener;
};

/**
 * chatSend() adalah fungsi untuk mengikirim konten chatting ke database
 * @param {*} chatContent
 * @param {*} sender
 * @param {*} receiver
 */
export const chatSend = function ({
  chatContent,
  sender = {},
  receiver = {},
  category,
  itemMasalah,
  chatId = null
}) {
  const today = moment();
  const date = today.format('YYYY-MM-DD');
  const time = today.format('HH:mm');
  const unixTimestamp = today.format('x');

  const data = {
    sendBy: sender.uid,
    chatContent: chatContent,
    chatDate: unixTimestamp,
    chatTime: time
  };

  const chatID = chatId
    ? chatId
    : `${sender.uid}_${receiver.uid}_${itemMasalah.id}`;

  const urlFirebase = `chatting/${chatID}/allChat/${date}`;
  const urlMessageSender = `messages/${sender.uid}/${chatID}`;
  const urlMessageReceiver = `messages/${receiver.uid}/${chatID}`;

  const dataHistoryChatForSender = {
    lastContentChat: chatContent,
    lastChatDate: unixTimestamp,
    uidPartner: receiver.uid,
    category,
    itemMasalah
  };

  const dataHistoryChatForReceiver = {
    lastContentChat: chatContent,
    lastChatDate: unixTimestamp,
    uidPartner: sender.uid,
    category,
    itemMasalah
  };
  database()
    .ref(urlFirebase)
    .push(data)
    .then(() => {
      database().ref(urlMessageSender).set(dataHistoryChatForSender);
      database().ref(urlMessageReceiver).set(dataHistoryChatForReceiver);

      if (sender && sender.role && sender.role.toLowerCase() === 'kajur') {
        sendNotification(receiver.fcmtoken, {
          title: `Pesan baru! - ${itemMasalah.title}`,
          body: `Kajur: ${chatContent}`
        });
      } else {
        sendNotification(receiver.fcmtoken, {
          title: `Pesan baru! - ${itemMasalah.title}`,
          body: `${sender.fullName}: ${chatContent}`
        });
      }
    })
    .catch(err => {
      showError(err.message);
    });
};

/**
 * sendRatePerMasalah() adalah fungsi
 * untuk memberi rating per 1 masalah
 */
export const sendRatePerMasalah = async function ({ categoryId, itemMasalah }) {
  try {
    const payload = {
      rate: itemMasalah.rate + 1
    };
    await database()
      .ref(`categoryMasalah/${categoryId}/${itemMasalah.id}`)
      .update(payload);
    return true;
  } catch (err) {
    throw err;
  }
};

/**
 * getReportMessageByMasalahId() adalah fungsi untuk
 * mendapatkan riwayat message dari pengguna terkait
 */
export const getReportMessageByMasalahId = async function (userId, masalahId) {
  try {
    showLoading(true);
    const snapshot = await database().ref(`messages/${userId}/`).once('value');

    if (!snapshot.val()) {
      showLoading(false);
      showError('Riyawat tidak ditemukan');
      throw { message: 'Riyawat tidak ditemukan' };
    }

    let data = null;

    Object.keys(snapshot.val()).forEach(function (chatId) {
      if (snapshot.val()[chatId]) {
        const itemMasalahId = chatId.split('_')[2];
        if (itemMasalahId === masalahId) {
          data = {
            id: chatId,
            ...snapshot.val()[chatId]
          };
        }
      }
    });

    if (data && data.uidPartner) {
      const receiver = await getUserByUid(data.uidPartner);
      data = {
        receiver,
        ...data
      };
    }

    showLoading(false);
    return data;
  } catch (err) {
    showLoading(false);
    showError(err.message);
    throw err;
  }
};

/**
 * getRiwayatKonsultasi() ntuk mendapatkan data chatting
 * setiap pengguna
 * @param {*} param0
 */
export const getRiwayatKonsultasi = async function ({
  senderUid,
  receiverUid,
  itemMasalahId,
  chatId = null
}) {
  try {
    const chatID = chatId
      ? chatId
      : `${senderUid}_${receiverUid}_${itemMasalahId}`;
    const urlFirebase = `chatting/${chatID}/allChat/`;
    const snapshot = await database().ref(urlFirebase).once('value');
    let allDataChat = [];

    if (snapshot.val()) {
      const dataSnapshot = snapshot.val();
      Object.keys(dataSnapshot).map(key => {
        const dataChat = dataSnapshot[key];
        let newDataChat = [];
        Object.keys(dataChat).map(itemChat => {
          newDataChat.push({
            id: itemChat,
            data: dataChat[itemChat]
          });
        });

        // newDataChat = newDataChat.reverse();

        allDataChat.push({
          id: key,
          data: newDataChat
        });
      });

      // allDataChat = allDataChat.reverse();
    }
    return allDataChat;
  } catch (err) {
    throw err;
  }
};
