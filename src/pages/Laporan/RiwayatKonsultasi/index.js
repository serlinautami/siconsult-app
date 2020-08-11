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
  moment
} from '@libraries';
import { Header, ChatItem } from '@components';
import { fonts, colors, getData, convertDateToMomentFormat } from '@utils';
import { getRiwayatKonsultasi } from '@services';

const RiwayatKonsultasi = ({ navigation, route }) => {
  const { category, itemMasalah, receiverData, chatId } = route.params;

  const initialState = {
    headers: {
      category: category || {},
      itemMasalah: itemMasalah || {}
    },
    receiver: receiverData || {}
  };

  const [headerChat] = useState(initialState.headers);
  const [user, setUser] = useState({});
  const [receiver] = useState(initialState.receiver);
  const [chatData, setChatData] = useState([]);
  const scrollContainer = useRef(null);

  /**
   * inisiasi data pertama
   */
  const initiateFirstData = useCallback(async () => {
    try {
      let dataUser = {};
      const receiverUid =
        receiverData && receiverData.uid ? receiverData.uid : '';

      dataUser = await getData('user');
      setUser(dataUser);

      const payload = {
        senderUid: dataUser.uid,
        receiverUid: receiverUid,
        itemMasalahId: headerChat.itemMasalah.id,
        chatId
      };
      const chatList = await getRiwayatKonsultasi(payload);
      setChatData(chatList);
      return true;
    } catch (err) {
      throw err;
    }
  }, [receiverData, headerChat.itemMasalah.id, chatId]);

  const handleContentSizeChange = e => {
    if (scrollContainer && scrollContainer.current) {
      scrollContainer.current.scrollResponderScrollToEnd();
    }
  };

  useEffect(() => {
    initiateFirstData();

    return () => {};
  }, [initiateFirstData]);

  return (
    <View style={styles.page}>
      <Header title="Riwayat Konsultasi" onPress={() => navigation.goBack()} />
      <View style={styles.headerWrapper}>
        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>Nama</Text>
          <Text style={styles.headerValue}>: {receiver.fullName}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>NPM</Text>
          <Text style={styles.headerValue}>: {receiver.idNumber}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>Konsultasi</Text>
          <Text style={styles.headerValue}>
            : {headerChat.itemMasalah.title}
          </Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>Kategori</Text>
          <Text style={styles.headerValue}>: {headerChat.category.name}</Text>
        </View>
      </View>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollContainer}
          onContentSizeChange={handleContentSizeChange}>
          {chatData.map(chat => {
            return (
              <View key={chat.id}>
                <Text style={styles.chatDate}>{`Tanggal: ${moment(
                  chat.id,
                  'YYYY-MM-DD'
                ).format('DD MMMM YYYY')}`}</Text>
                {chat.data.map(itemChat => {
                  const isMe = itemChat.data.sendBy === user.uid;
                  return (
                    <ChatItem
                      name={isMe ? 'Kajur' : receiver.fullName}
                      simple
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
    </View>
  );
};

export default RiwayatKonsultasi;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { flex: 1 },
  chatDate: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.border
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },

  headerContent: {
    flexDirection: 'row',
    marginBottom: 4
  },
  headerLabel: {
    width: 90
  }
});
