import { StyleSheet, Text, View, ImageBackground, React } from '@libraries';
import { ILLogo, ILGetStarted } from '@assets';
import { Button, Gap } from '@components';
import { colors, fonts, routeConstant } from '@utils';

const GetStarted = ({ navigation }) => {
  return (
    <ImageBackground source={ILGetStarted} style={styles.page}>
      <View>
        <ILLogo />
        <Text style={styles.title}>
          Konsultasi dengan Kajur jadi lebih mudah & fleksibel
        </Text>
      </View>
      <View>
        <Button
          title="Get Started"
          onPress={() => navigation.navigate(routeConstant.REGISTER)}
        />
        <Gap height={16} />
        <Button
          type="secondary"
          title="Sign In"
          onPress={() => navigation.navigate(routeConstant.LOGIN)}
        />
      </View>
    </ImageBackground>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    justifyContent: 'space-between',
    backgroundColor: colors.secondary,
    flex: 1
  },
  title: {
    fontSize: 28,
    marginTop: 91,
    color: colors.white,
    fontFamily: fonts.primary[600]
  }
});
