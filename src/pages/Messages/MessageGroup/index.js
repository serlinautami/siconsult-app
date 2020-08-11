/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
import {
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  ScrollView,
  database
} from '@libraries';
import { List ,Header} from '@components';
import { getUserByUid } from '@services';
import { colors, fonts, getData, routeConstant } from '@utils';
import { ILNullPhoto } from '@assets';

const MessageGroup = ({ route, navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  const { category, itemMasalah } = route.params;

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory).orderByChild(`itemMasalah/id`).equalTo(itemMasalah.id);

    messagesDB.on('value', async snapshot => {
      if (snapshot.val()) {
        const oldData = snapshot.val();
        const data = [];

        const promises = Object.keys(oldData).map(async key => {
          const receiver = await getUserByUid(oldData[key].uidPartner);
          data.push({
            id: key,
            receiver,
            ...oldData[key]
          });
        });

        await Promise.all(promises);

        setHistoryChat(data);
      }
    });
  }, [user.uid, itemMasalah]);


  const renderListMessage = () => {
    return (
      <React.Fragment>
        {historyChat.map(chat => {
          const partner = {
            ...chat.receiver
          };

          const nameList =
            user && user.role && user.role.toLowerCase() === 'kajur'
              ? `${partner.fullName}`
              : `${chat.itemMasalah.title}`;
          return (
            <List
              key={chat.id}
              profile={partner?.photo?.length > 1 ? { uri: partner.photo } : ILNullPhoto}
              name={nameList}
              type="next"
              desc={chat.lastContentChat}
              onPress={() =>
                navigation.navigate(routeConstant.CHATTING, {
                  kajurData: partner,
                  receiverData: partner,
                  category: chat.category,
                  itemMasalah: chat.itemMasalah,
                  chatId: chat.id
                })
              }
            />
          );
        })}
      </React.Fragment>
    );
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header
          type="dark-profile"
          title={category.name}
          desc={`${itemMasalah.title}`}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          {renderListMessage()}
        </ScrollView>
      </View>
    </View>
  );
};

export default MessageGroup;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.secondary, flex: 1 },
  content: {
    backgroundColor: colors.white,
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20.0
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 30,
    marginLeft: 16
  },
  labelTitle: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.border
  }
});
