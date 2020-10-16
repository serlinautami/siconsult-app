/* eslint-disable prettier/prettier */
import {
  StyleSheet,
  View,
  React,
  ScrollView,
  Linking
} from '@libraries';
import { Header, ItemComponent, Button } from '@components';
import { colors, showError } from '@utils';
import { currentConfig } from '@configs';

const AboutApp = ({ navigation }) => {

  const openLink = (url) =>  {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    }).catch(() => {
      // console.log('err', err);
      showError('Tidak bisa membuka url');
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Tentang Aplikasi" onPress={() => navigation.goBack()} />
      <View style={styles.scrollWrapper}>
      <ScrollView>
          <ItemComponent
            label="Nama Aplikasi"
            value={currentConfig.appName}
          />
          <ItemComponent
            label="Deskripsi Aplikasi"
            value={currentConfig.appDescription}
          />
          <ItemComponent
            label="Versi"
            value={currentConfig.version}
          />
          <ItemComponent
            label="Kampus"
            value={currentConfig.campus}
          />
          <ItemComponent canPressed onPress={() => openLink(currentConfig.developer1.wa)} label="Developer 1" value={currentConfig.developer1.name} />
          <ItemComponent canPressed onPress={() => openLink(currentConfig.developer2.wa)} label="Developer 2" value={currentConfig.developer2.name} />
          <ItemComponent canPressed on label="Kebijakan Privasi" value="Sentuh untuk melihat kebijakan privasi" onPress={() => openLink(currentConfig.privacyPolicy)} />
        </ScrollView>
      </View>

        <View style={styles.buttonHolder}>
        <Button onPress={() => openLink(currentConfig.playstore)} title="Beri Rating Aplikasi" />
      </View>
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
