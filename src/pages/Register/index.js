import { ScrollView, StyleSheet, View, React, useState } from '@libraries';
import { Button, Gap, Header, Input } from '@components';
import { colors, useForm, routeConstant } from '@utils';
import { signUp } from '@services';

const Register = ({ navigation }) => {
  const [form, setForm] = useForm({
    fullName: '',
    role: 'Mahasiswa',
    idNumber: '',
    gender: '',
    telphon: '',
    email: '',
    password: ''
  });

  const [itemGender] = useState([
    {
      id: 0,
      label: 'Pilih Gender',
      value: ''
    },
    {
      id: 1,
      label: 'Pria',
      value: 'pria'
    },
    {
      id: 2,
      label: 'Wanita',
      value: 'wanita'
    }
  ]);

  const onContinue = () => {
    signUp(form)
      .then(data => {
        navigation.navigate(routeConstant.UPLOADPHOTO, data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View style={styles.page}>
      <Header onPress={() => navigation.goBack()} title="Daftar Akun" />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Input
            label="Full Name"
            value={form.fullName}
            onChangeText={value => setForm('fullName', value)}
            placeholder="isi nama lengkap"
          />
          <Gap height={24} />
          <Input
            label="Npm"
            value={form.idNumber}
            onChangeText={value => setForm('idNumber', value)}
            placeholder="isi nomor ID"
            maxLength={10}
            keyboardType={'numeric'}
          />
          <Gap height={24} />
          <Input
            label="Gender"
            value={form.gender}
            onValueChange={value => setForm('gender', value)}
            select
            selectItem={itemGender}
          />
          <Gap height={24} />
          <Input
            label="Telepon"
            value={form.telphon}
            onChangeText={value => setForm('telphon', value)}
            placeholder="Isi nomor telepon"
            keyboardType={'phone-pad'}
            maxLength={12}
          />
          <Gap height={24} />
          <Input
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
            placeholder="Isi email anda"
          />
          <Gap height={24} />
          <Input
            label="Password"
            value={form.password}
            onChangeText={value => setForm('password', value)}
            secureTextEntry
            placeholder="Isi Password anda"
          />
          <Gap height={40} />
          <Button title="Continue" onPress={onContinue} />
          <Gap height={80} />
        </ScrollView>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { paddingHorizontal: 40, flex: 1 }
});
