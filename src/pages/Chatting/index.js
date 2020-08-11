import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  React,
  useState,
  useEffect,
  useCallback,
  useRef,
  database
} from '@libraries';
import { Header, ChatItem, InputChat } from '@components';
import { fonts, colors, getData } from '@utils';
import {
  getDataKajur,
  getChatting,
  chatSend,
  sendRatePerMasalah,
  getUserByUid,
  createReport
} from '@services';

import { ILNullPhoto } from '@assets';

const Chatting = ({ navigation, route }) => {
  const { category, itemMasalah, receiverData, chatId } = route.params;

  const initialState = {
    headers: {
      category: category || {},
      itemMasalah: itemMasalah || {}
    },
    receiver: receiverData || {}
  };

  const [headerChat] = useState(initialState.headers);
  const [chatContent, setChatContent] = useState('');
  const [user, setUser] = useState({});
  const [userReceiver] = useState({});
  const [receiver] = useState(initialState.receiver);
  const [chatData, setChatData] = useState([]);
  const scrollContainer = useRef(null);

  /**
   * inisiasi data pertama
   */
  const initiateFirstData = useCallback(async () => {
    try {
      let dataUser = {};
      let dataReceiver = {};
      const receiverUid =
        receiverData && receiverData.uid ? receiverData.uid : '';

      dataUser = await getData('user');
      setUser(dataUser);

      const payload = {
        senderUid: dataUser.uid,
        receiverUid: receiverUid,
        callback: setChatData,
        itemMasalahId: headerChat.itemMasalah.id,
        chatId
      };
      getChatting(payload);

      return true;
    } catch (err) {
      throw err;
    }
  }, [receiverData, headerChat.itemMasalah.id, chatId]);

  const onPressSend = () => {
    const payload = {
      chatContent,
      sender: user,
      receiver: receiver,
      category: headerChat.category,
      itemMasalah: headerChat.itemMasalah,
      chatId
    };

    // console.log(payload);
    if (chatData.length === 0) {
      sendRatePerMasalah({
        categoryId: headerChat.category.id,
        itemMasalah: headerChat.itemMasalah
      });
      createReport({
        userId: user.uid,
        categoryId: headerChat.category.id,
        masalahId: headerChat.itemMasalah.id
      });
    }
    chatSend(payload);
    setChatContent('');
  };

  const handleContentSizeChange = e => {
    // console.log('scrollContainer', scrollContainer);
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollResponderScrollToEnd();
    }
  };

  useEffect(() => {
    initiateFirstData();
    const removeChatListener = (senderUid, receiverUid, itemMasalahId) => {
      const chatID = chatId || `${senderUid}_${receiverUid}_${itemMasalahId}`;
      const urlFirebase = `chatting/${chatID}/allChat/`;
      database().ref(urlFirebase).off('value');
    };

    return () => {
      removeChatListener(user.uid, receiver.uid, headerChat.itemMasalah.id);
    };
  }, [
    initiateFirstData,
    user.uid,
    receiver.uid,
    headerChat.itemMasalah.id,
    chatId
  ]);

  return (
    <View style={styles.page}>
      <Header
        type="dark-profile"
        title={receiver.fullName}
        desc={`${headerChat.category.name} - ${headerChat.itemMasalah.title}`}
        photo={
          receiver?.photo?.length > 1 ? { uri: receiver.photo } : ILNullPhoto
        }
        onPress={() => navigation.goBack()}
      />
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollContainer}
          onContentSizeChange={handleContentSizeChange}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{chat.id}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      key={itemChat.id}
                      isMe={isMe}
                      text={itemChat.data.chatContent}
                      date={itemChat.data.chatTime}
                      photo={isMe ? null : { uri: receiver.photo }}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
      </View>
      <InputChat
        value={chatContent}
        onChangeText={value => setChatContent(value)}
        onButtonPress={onPressSend}
        targetChat={receiver}
      />
    </View>
  );
};

export default Chatting;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { flex: 1 },
  chatDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginVertical: 20,
    textAlign: 'center'
  }
});
