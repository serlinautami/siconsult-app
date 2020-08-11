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
import { currentConfig } from '@configs';

const AboutApp = ({ navigation, route }) => {

  return (
    <View style={styles.page}>
      <Header title="Tentang Aplikasi" onPress={() => navigation.goBack()} />
        <ScrollView>
          <ItemComponent
            label="Nama Aplikasi"
            value={'Si Consult'}
          />
          <ItemComponent
            label="Versi"
            value={currentConfig.version}
          />
          <ItemComponent label="Author" value="Serlina Utami" />
        </ScrollView>
    </View>
  );
};

export default AboutApp;

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
