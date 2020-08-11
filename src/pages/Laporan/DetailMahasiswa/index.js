import {
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  ScrollView,
  Image
} from '@libraries';
import { Header, ItemComponent, Button } from '@components';
import { colors, routeConstant } from '@utils';
import { ILNullPhoto } from '@assets';
import { getReportMessageByMasalahId } from '@services';

const DetailMahasiswa = ({ navigation, route }) => {
  const { data, showChat, masalahId } = route.params;

  const [user, setUser] = useState({});

  const next = () => {
    getReportMessageByMasalahId(user.uid, masalahId)
      .then(message => {
        return navigation.navigate(routeConstant.RIWAYATKONSULTASI, {
          receiverData: user,
          category: message.category,
          itemMasalah: message.itemMasalah,
          chatId: message.id
        });
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    setUser(data);
  }, [data]);

  return (
    <View style={styles.page}>
      <Header title="Informasi" onPress={() => navigation.goBack()} />
      <ScrollView>
        <View style={styles.imageHolder}>
          <Image
            style={styles.image}
            source={data?.photo?.length > 0 ? { uri: data.photo } : ILNullPhoto}
            resizeMode="cover"
          />
        </View>
        <ItemComponent label="Nama Lengkap" value={user.fullName || '-'} />
        <ItemComponent label="NPM" value={user.idNumber || '-'} />
        <ItemComponent label="Email" value={user.email || '-'} />
        <ItemComponent label="Nomor Telepon" value={user.telphon || '-'} />
        <ItemComponent label="Gender" value={user.gender || '-'} />
        <ItemComponent label="Status" value={user.role || '-'} />
        {showChat && (
          <View style={styles.buttonWrapper}>
            <Button title="Lihat Riwayat Konsultasi" onPress={next} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default DetailMahasiswa;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  action: { paddingHorizontal: 40, paddingTop: 23 },
  imageHolder: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8
  },
  image: {
    width: '100%',
    paddingBottom: '62.25%'
  },
  buttonWrapper: {
    padding: 24
  }
});
