import { StyleSheet, View, React, ScrollView, Text } from '@libraries';
import { Header, ItemComponent } from '@components';
import { colors, routeConstant } from '@utils';

const DaftarMasalah = ({ navigation, route }) => {
  const { dataList } = route.params;

  const renderItemList = () => {
    if (dataList && dataList.length > 0) {
      return (
        <React.Fragment>
          {dataList.map((data, i) => {
            return (
              <ItemComponent
                key={i}
                reverse
                canPressed
                label={data.categoryId}
                value={data.title}
                onPress={() =>
                  navigation.navigate(routeConstant.DAFTARMAHASISWA, {
                    categoryId: data.categoryId,
                    masalahId: data.id,
                    dataList: data.users,
                    showChat: true
                  })
                }
                customNext={
                  <View style={styles.count}>
                    <Text style={styles.countText}>{data.count}</Text>
                  </View>
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
      <Header title="Daftar Konsultasi" onPress={() => navigation.goBack()} />
      <ScrollView>{renderItemList()}</ScrollView>
    </View>
  );
};

export default DaftarMasalah;

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
