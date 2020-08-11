/* eslint-disable prettier/prettier */
/* eslint-disable dot-notation */
/* eslint-disable quotes */
import {
  StyleSheet,
  Text,
  View,
  React,
  useEffect,
  useState,
  ScrollView,
  database
} from '@libraries';
import { List ,Header, ListGroup} from '@components';
import { getUserByUid } from '@services';
import { colors, fonts, getData, routeConstant } from '@utils';
import { ILNullPhoto } from '@assets';

const Messages = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [historyChat, setHistoryChat] = useState([]);

  const getDataUserFromLocal = () => {
    getData('user').then(res => {
      setUser(res);
    });
  };

  useEffect(() => {
    getDataUserFromLocal();
    const rootDB = database().ref();
    const urlHistory = `messages/${user.uid}/`;
    const messagesDB = rootDB.child(urlHistory);

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
  }, [user.uid]);


  const navigateToMessageGroup  = (a, b) => navigation.navigate(routeConstant.MESSAGEGROUP, {
    category: {
      id: a.id,
      name: a.name
    },
    itemMasalah: {
      title: b.title,
      id: b.id,
      rate: b.rate
    }
 });



  const renderHistory = (history = []) => {
    let category = {};

    [...history].forEach(item => {
      if (item.category) {
        category[item.category.id] = item.category;
        category[item.category.id]["itemMasalah"] = {};
      }
    });

    [...history].forEach(item => {
      Object.keys(category).forEach(categoryId => {
        if (
          item.itemMasalah &&
          item.category &&
          item.category.id === categoryId
        ) {
          category[categoryId]["itemMasalah"][item.itemMasalah.id] =
            item.itemMasalah;
          category[categoryId]["itemMasalah"][item.itemMasalah.id]["chats"] = [];
        }
      });
    });

    [...history].forEach(item => {
      Object.keys(category).forEach(categoryId => {
        const itemCategory = { ...item.category };
        const itemMasalah = { ...item.itemMasalah };
        const icId = item.category.id;
        if (itemCategory && itemCategory && itemCategory.id === categoryId) {
          Object.keys(category[itemCategory.id].itemMasalah).forEach(
            masalahId => {
              if (itemMasalah.id === masalahId) {
                const itemChat = { ...item };
                delete itemChat.category;
                delete itemChat.itemMasalah;
                category[icId].itemMasalah[itemMasalah.id]["chats"].push(
                  itemChat
                );
              }
            }
          );
        }
      });
    });

    category = Object.keys(category).map(categoryId => {
      let itemMasalah = category[categoryId].itemMasalah;

      itemMasalah = Object.keys(itemMasalah).map(itemKey => {
        return {
          ...itemMasalah[itemKey]
        };
      });
      return {
        ...category[categoryId],
        itemMasalah
      };
    });

    return category;
  };


  const renderListMessage = () => {

    if (user && user.role && user.role.toLowerCase() === 'kajur') {
      const historyKajur = renderHistory(historyChat);

      if (!historyKajur || historyKajur.length === 0) {
        return null;
      }
      return (
       <React.Fragment>
         {historyKajur.map(a => {
           if (!a.itemMasalah || a.itemMasalah.length === 0) {
             return null;
           }

           return (
             <View key={a.id}>
               <Text style={styles.labelTitle}>{a.name}</Text>
               {a.itemMasalah.map(b => {
                 return (
                   <ListGroup
                    onPress={() => navigateToMessageGroup(a,b)}
                    type="next" key={`${a.id}-${b.id}`}
                    category={a.id}
                    itemList={b.chats}
                    title={b.title}
                  />
                 );
               })}
             </View>
           );
         })}
       </React.Fragment>
      );
    }

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
          type="dark"
          title={"Messages"}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          {renderListMessage()}
        </ScrollView>
      </View>
    </View>
  );
};

export default Messages;

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
