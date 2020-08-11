import {
  ScrollView,
  StyleSheet,
  View,
  React,
  useState,
  Text
} from '@libraries';
import { Button, Gap, Header, Input } from '@components';
import { colors, useForm, routeConstant, showError } from '@utils';
import { signUp, sendPasswordResetEmail } from '@services';

const ForgotPassword = ({ navigation }) => {
  const [form, setForm] = useForm({
    email: ''
  });

  const onContinue = async () => {
    if (!form.email) {
      return showError('Email harus diisi!');
    }
    await sendPasswordResetEmail(form.email);
    setForm('reset');
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Lupa Password" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
            placeholder="Email confirmation"
          />
          <Gap height={40} />
          <Button title="Submit" onPress={onContinue} />
          <Gap height={80} />
        </ScrollView>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { paddingHorizontal: 40, flex: 1 }
});
