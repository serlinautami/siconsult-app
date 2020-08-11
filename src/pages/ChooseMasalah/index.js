import {
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  useCallback,
  ScrollView,
  Alert
} from '@libraries';
import { Header, ListMasalah, Button, Gap } from '@components';
import { colors, getData, routeConstant } from '@utils';
import { getMasalahByCategory, deleteMasalah } from '@services';

const ChooseMasalah = ({ navigation, route }) => {
  const [user, setUser] = useState(null);
  const [listmasalah, setListmasalah] = useState([]);
  const [scrollState, setScrollState] = useState(0);
  const { category, updateScreen } = route.params;

  useEffect(() => {
    onGoBack();
  }, [updateScreen, onGoBack]);

  const getUser = useCallback(async function () {
    const data = await getData('user');
    setUser(data);
    return data;
  }, []);

  const initData = useCallback(async () => {
    await getUser();
    const dataList = await getMasalahByCategory(category.id);
    setListmasalah(dataList);
  }, [getUser, category.id]);

  const onGoBack = useCallback(
    function () {
      initData();
    },
    [initData]
  );

  const onPressDelete = function (dataDelete) {
    Alert.alert(
      'Perhatian!',
      `Hapus "${dataDelete.title}" dari daftar?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            deleteMasalah(category.id, dataDelete.id).then(() => {
              initData();
            });
          }
        }
      ],
      { cancelable: false }
    );
  };
  const onPressEdit = function (dataEdit) {
    navigation.navigate(routeConstant.FORMMASALAH, {
      category: category,
      isEdit: true,
      dataEdit,
      id: dataEdit.id
    });
  };

  const renderButtonAdd = () => {
    if (user && user.role && user.role.toLowerCase() === 'kajur') {
      return (
        <Button
          type="icon-only"
          icon="plus"
          btnStyle={styles.floatButton}
          onPress={() =>
            navigation.navigate(routeConstant.FORMMASALAH, {
              category: category,
              isEdit: false,
              id: null
            })
          }
        />
      );
    }

    return null;
  };

  useEffect(() => {
    initData();
  }, [initData]);

  const headerTitle =
    user && user.role && user.role.toLowerCase() === 'kajur'
      ? `Daftar Masalah ${category.name}`
      : `Pilih Masalah ${category.name}`;

  return (
    <View style={styles.page}>
      <Header
        type="dark"
        title={headerTitle}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        {listmasalah.map((masalah, index) => {
          return (
            <ListMasalah
              key={index}
              type="next"
              title={masalah.title}
              onPressEdit={
                user && user.role && user.role.toLowerCase() === 'kajur'
                  ? () => onPressEdit(masalah)
                  : null
              }
              onPressDelete={
                user && user.role && user.role.toLowerCase() === 'kajur'
                  ? () => onPressDelete(masalah)
                  : null
              }
              onPress={() =>
                navigation.navigate(routeConstant.DETAILMASALAH, {
                  category: category,
                  itemMasalah: masalah
                })
              }
            />
          );
        })}
        <Gap height={120} />
      </ScrollView>
      {renderButtonAdd()}
    </View>
  );
};

export default ChooseMasalah;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  floatButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    width: 70,
    height: 70,
    borderRadius: 50
  }
});
