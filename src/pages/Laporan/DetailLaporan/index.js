/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  moment,
  ScrollView,
  Share
} from '@libraries';
import { Header, ItemComponent, Button } from '@components';
import { colors, routeConstant } from '@utils';
import { getReportById } from '@services';
import { getReportType } from '@utils';

const DetailLaporan = ({ navigation, route }) => {
  const { report, type } = route.params;

  const [detail, setDetail] = useState({});

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `[siconsult-app] Laporan:${detail.reportName}, Tipe Laporan: ${getReportType(detail.type)}, url: https://siconsult-report.vercel.app/laporan?type=${type}&id=${report.reportKey}`
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    getReportById(type, report.reportKey).then(data => {
      setDetail({ ...data, type });
    });
  }, [type, report.reportKey]);

  return (
    <View style={styles.page}>
      <Header title="Detail Laporan" onPress={() => navigation.goBack()} />
      <View style={styles.scrollWrapper}>
        <ScrollView>
          <ItemComponent
            label="Nama Laporan"
            value={detail.reportName || '-'}
          />
          <ItemComponent
            label="Tipe Laporan"
            value={getReportType(detail.type) || '-'}
          />
          <ItemComponent label="ID Laporan" value={detail.reportId || '-'} />
          <ItemComponent
            canPressed
            onPress={() =>
              navigation.navigate(routeConstant.DAFTARMASALAH, {
                dataList: detail.reportedMasalah
              })
            }
            next
            label="Total Konsultasi"
            value={detail.count ? `${detail.count} konsultasi` : '-'}
          />

          <ItemComponent
            label="Mahasiswa yang berkonsultasi"
            canPressed
            next
            onPress={() =>
              navigation.navigate(routeConstant.DAFTARMAHASISWA, {
                dataList: detail.reportedUsers
              })
            }
            value={
              detail.reportedUsers && detail.reportedUsers.length > 0
                ? `${detail.reportedUsers.length} Orang`
                : 'Tidak ada'
            }
          />
          <ItemComponent
            label="Dibuat"
            value={
              detail.createdAt
                ? moment(detail.createdAt).format(
                    'dddd, DD MMMM YYYY, HH:mm:ss'
                  )
                : '-'
            }
          />

          <ItemComponent
            label="Diperbaharui"
            value={
              detail.updatedAt
                ? moment(detail.updatedAt).format(
                    'dddd, DD MMMM YYYY, HH:mm:ss'
                  )
                : '-'
            }
          />
        </ScrollView>
      </View>
      <View style={styles.buttonHolder}>
        <Button onPress={onShare} title="Bagikan Laporan" />
      </View>
    </View>
  );
};

export default DetailLaporan;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  action: { paddingHorizontal: 40, paddingTop: 23 },
  scrollWrapper: {
    flex: 1
  },
  buttonHolder: {
    padding: 24,
    backgroundColor: colors.white
  }
});
