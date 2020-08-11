import {
  ScrollView,
  StyleSheet,
  View,
  React,
  useEffect,
  useState,
  ImagePicker,
  auth
} from '@libraries';
import { ILNullPhoto } from '@assets';
import { Button, Gap, Header, Input, Profile } from '@components';
import { colors, getData, showError, routeConstant } from '@utils';
import { updateProfile } from '@services';

const UpdateProfile = ({ navigation }) => {
  const [profile, setProfile] = useState({
    fullName: '',
    role: '',
    idNumber: '',
    gender: '',
    telphon: '',
    email: ''
  });

  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(ILNullPhoto);
  const [photoForDB, setPhotoForDB] = useState('');

  useEffect(() => {
    getData('user').then(res => {
      const data = res;
      data.photoForDB = res?.photo?.length > 1 ? res.photo : ILNullPhoto;
      const tempPhoto =
        res?.photo?.length > 1 ? { uri: res.photo } : ILNullPhoto;

      setPhoto(tempPhoto);
      setProfile(data);
    });
  }, []);

  const update = () => {
    if (password.length > 0) {
      if (password.length < 6) {
        showError('Password kurang dari 6 karater');
      } else {
        updatePassword();
        updateProfileData();
      }
    } else {
      updateProfileData();
    }
  };

  const updatePassword = () => {
    auth().onAuthStateChanged(user => {
      if (user) {
        user.updatePassword(password).catch(err => {
          showError(err.message);
        });
      }
    });
  };

  const updateProfileData = async () => {
    const data = {
      ...profile
    };

    if (photoForDB) {
      data.photo = photoForDB;
    }

    delete data.photoForDB;

    await updateProfile(data);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: routeConstant.DASHBOARD,
          params: {
            isAdmin:
              profile && profile.role && profile.role.toLowerCase() === 'kajur'
                ? true
                : false
          }
        }
      ]
    });
  };

  const changeText = (key, value) => {
    setProfile({
      ...profile,
      [key]: value
    });
  };

  const getImage = () => {
    ImagePicker.launchImageLibrary(
      { quality: 0.5, maxWidth: 200, maxHeight: 200 },
      response => {
        if (response.didCancel || response.error) {
          showError('oops, sepertinya anda tidak memilih foto nya?');
        } else {
          const source = { uri: response.uri };

          setPhotoForDB(`data:${response.type};base64, ${response.data}`);
          setPhoto(source);
        }
      }
    );
  };

  return (
    <View style={styles.page}>
      <Header title="Edit Profile" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {profile.fullName.length > 0 && (
            <Profile
              name={profile.fullName}
              desc={profile.idNumber}
              isRemove
              photo={photo}
              onPress={getImage}
            />
          )}
          <Gap height={26} />
          <Input
            label="Full Name"
            value={profile.fullName}
            onChangeText={value => changeText('fullName', value)}
          />
          <Gap height={24} />
          <Input
            label="Status"
            value={profile.role}
            onChangeText={value => changeText('role', value)}
            disable
          />
          <Gap height={24} />
          <Input
            label={`Nomor ID (${
              profile.role === 'Mahasiswa' ? 'NPM' : 'NIDN'
            })`}
            value={`${profile.idNumber}`}
            onChangeText={value => changeText('idNumber', value)}
            maxLength={10}
            keyboardType={'numeric'}
            disable
          />
          <Gap height={24} />
          <Input
            label="Gender"
            value={profile.gender}
            onChangeText={value => changeText('gender', value)}
            disable
          />
          <Gap height={24} />
          <Input
            label="Telphon"
            value={`${profile.telphon}`}
            onChangeText={value => changeText('telphon', value)}
            placeholder="Isi nomor telphon"
            keyboardType={'phone-pad'}
            maxLength={12}
          />
          <Gap height={24} />
          <Input label="Email" value={profile.email} />
          <Gap height={24} />
          <Input
            label="Password"
            secureTextEntry
            value={password}
            onChangeText={value => setPassword(value)}
          />
          <Gap height={40} />
          <Button title="Save Profile" onPress={update} />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  page: { backgroundColor: colors.white, flex: 1 },
  content: { padding: 40, paddingTop: 0 }
});
