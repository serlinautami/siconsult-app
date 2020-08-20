import { ScrollView, StyleSheet, Text, View, React } from '@libraries';
import { ILLogo } from '@assets';
import { Button, Gap, Input, Link } from '@components';
import { colors, fonts, useForm, routeConstant } from '@utils';
import { signIn } from '@services';

const Login = ({ navigation }) => {
  const [form, setForm] = useForm({ email: '', password: '' });

  const login = () => {
    signIn(form)
      .then(userData => {
        const { role } = userData;

        navigation.reset({
          index: 0,
          routes: [
            {
              name: routeConstant.DASHBOARD,
              params: {
                isAdmin: role && role.toLowerCase() === 'kajur' ? true : false
              }
            }
          ]
        });
      })
      .catch(() => {});
  };

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={40} />
        <ILLogo />
        <Text style={styles.title}>Masuk dan mulai berkonsultasi</Text>
        <Input
          label="Email Address"
          value={form.email}
          onChangeText={value => setForm('email', value)}
        />
        <Gap height={24} />
        <Input
          label="Password"
          value={form.password}
          onChangeText={value => setForm('password', value)}
          secureTextEntry
        />
        <Gap height={10} />
        <Link
          title="Forgot My Password"
          size={12}
          onPress={() => navigation.navigate(routeConstant.FORGOTPASSWORD)}
        />
        <Gap height={40} />
        <Button title="Sign In" onPress={login} />
        <Gap height={30} />
        <Link
          title="Create New Account"
          size={16}
          align="center"
          onPress={() => navigation.navigate(routeConstant.REGISTER)}
        />
      </ScrollView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  page: { paddingHorizontal: 40, backgroundColor: colors.white, flex: 1 },
  title: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 40,
    marginBottom: 40,
    maxWidth: 153
  }
});
