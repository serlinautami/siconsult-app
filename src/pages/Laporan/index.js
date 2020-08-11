import { StyleSheet, Text, View, ImageBackground, React } from '@libraries';
import { fonts, colors, routeConstant } from '@utils';
import { ListLaporan, List } from '@components';
import { ILConsult, pdf } from '@assets';

const Laporan = ({ navigation }) => {
  const navigateToList = function ({ type, title }) {
    navigation.navigate(routeConstant.DAFTARLAPORAN, {
      type,
      title
    });
  };

  return (
    <View style={styles.page}>
      <ImageBackground source={ILConsult} style={styles.background}>
        <Text style={styles.title}>Laporan Konsultasi</Text>
      </ImageBackground>
      <View style={styles.content}>
        <List
          icon="laporan"
          name="Laporan Harian"
          desc="Daftar semua laporan harian"
          onPress={() =>
            navigateToList({
              type: 'daily',
              title: 'Harian'
            })
          }
        />
        <List
          icon="laporan"
          name="Laporan Bulanan"
          desc="Daftar semua laporan bulanan"
          onPress={() =>
            navigateToList({
              type: 'monthly',
              title: 'Bulanan'
            })
          }
        />
        <List
          icon="laporan"
          name="Laporan Tahunan"
          desc="Daftar semua laporan tahunan"
          onPress={() =>
            navigateToList({
              type: 'yearly',
              title: 'Tahunan'
            })
          }
        />
      </View>
    </View>
  );
};

export default Laporan;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  content: {
    backgroundColor: colors.white,
    borderRadius: 20,
    marginTop: -30,
    flex: 1,
    paddingTop: 14
  },
  page: {
    backgroundColor: colors.secondary,
    flex: 1
  },
  background: {
    height: 250,
    paddingTop: 30
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textAlign: 'center',
    marginTop: 30
  },
  decs: {
    fontSize: 14,
    fontFamily: fonts.primary[300],
    color: colors.text.primary,
    marginTop: 6,
    textAlign: 'center'
  }
});
