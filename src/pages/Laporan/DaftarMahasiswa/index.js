import { StyleSheet, View, React, ScrollView } from '@libraries';
import { Header, List } from '@components';
import { colors, routeConstant } from '@utils';
import { ILNullPhoto } from '@assets';

const DaftarMahasiswa = ({ navigation, route }) => {
  const { dataList, showChat, categoryId, masalahId } = route.params;

  const renderProfileList = () => {
    if (dataList && dataList.length > 0) {
      return (
        <React.Fragment>
          {dataList.map((data, i) => {
            return (
              <List
                key={i}
                profile={
                  data?.photo?.length > 1 ? { uri: data.photo } : ILNullPhoto
                }
                name={data.fullName}
                desc={data.email}
                onPress={() =>
                  navigation.navigate(routeConstant.DETAILMAHASISWA, {
                    data,
                    categoryId,
                    masalahId,
                    showChat: showChat || false
                  })
                }
              />
            );
          })}
        </React.Fragment>
      );
    }
    return null;
  };

  return (
    <View style={styles.page}>
      <Header title="Daftar Mahasiswa" onPress={() => navigation.goBack()} />
      <ScrollView>{renderProfileList()}</ScrollView>
    </View>
  );
};

export default DaftarMahasiswa;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  action: { paddingHorizontal: 40, paddingTop: 23 },
  count: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 40 / 2
  },
  countText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  }
});
