import {
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  ScrollView,
  moment
} from '@libraries';
import { List, Header } from '@components';
import { getReportByType } from '@services';
import { colors, fonts, routeConstant } from '@utils';

const DaftarLaporan = ({ route, navigation }) => {
  const { type, title } = route.params;
  const [reports, setReport] = useState([]);

  useEffect(() => {
    getReportByType(type).then(function (result) {
      setReport(result);
    });
  }, [type]);

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <Header
          type="dark"
          title={`Laporan ${title}`}
          onPress={() => navigation.goBack()}
        />
        <ScrollView>
          {reports.map(data => {
            return (
              <List
                key={data.reportId}
                icon="laporan"
                name={data.reportName}
                desc={`Terakhir diperbarui ${moment(data.updatedAt).format(
                  'DD MMMM YYYY'
                )}`}
                onPress={() =>
                  navigation.navigate(routeConstant.DETAILLAPORAN, {
                    type,
                    report: data
                  })
                }
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default DaftarLaporan;

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
