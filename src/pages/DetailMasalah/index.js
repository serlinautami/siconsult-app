import { StyleSheet, View, React, useEffect, useState } from '@libraries';
import {
  Button,
  Header,
  MasalahItem,
  Gap,
  CatagoryMasalah,
  Item
} from '@components';
import { colors, routeConstant } from '@utils';
import { showLoading } from '@modules';
import { getDataKajur } from '@services';
import { getData } from '@utils';

const DetailMasalah = ({ navigation, route }) => {
  const { category, itemMasalah } = route.params;
  const [user, setUser] = useState({});

  const getUserData = async function () {
    try {
      const data = await getData('user');
      setUser(data);
    } catch (err) {
      throw err;
    }
  };

  const onStartConsult = async function () {
    try {
      showLoading(true);
      const kajurData = await getDataKajur();
      showLoading(false);
      return navigation.navigate(routeConstant.CHATTING, {
        category,
        itemMasalah,
        kajurData,
        receiverData: kajurData
      });
    } catch (err) {
      showLoading(false);
      // console.log(err)
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const renderBtn = function () {
    if (user && user.role && user.role.toLowerCase() !== 'kajur') {
      return (
        <View style={styles.action}>
          <Button title="Start Consultation" onPress={onStartConsult} />
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.page}>
      <Header title="Detail Masalah" onPress={() => navigation.goBack()} />
      <Item catagory={category.name} />
      <Gap height={15} />
      <MasalahItem label="Tentang" value={itemMasalah.title} />
      <MasalahItem label="Keterangan" value={itemMasalah.description} />
      <MasalahItem label="ID_masalah" value={itemMasalah.id} />
      {renderBtn()}
    </View>
  );
};

export default DetailMasalah;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  action: { paddingHorizontal: 40, paddingTop: 23 }
});
