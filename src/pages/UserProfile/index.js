import { StyleSheet, View, React, moment } from '@libraries';
import { Gap, Header, List, Profile } from '@components';
import { routeConstant } from '@utils';
import { signOut } from '@services';

const UserProfile = ({ navigation, route }) => {
  const profile = route.params;

  const onSignOut = async () => {
    await signOut();
    navigation.reset({
      index: 0,
      routes: [
        {
          name: routeConstant.GETSTARTED
        }
      ]
    });
  };

  return (
    <View style={styles.page}>
      <Header title="Profil" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      {profile.fullName.length > 0 && (
        <Profile
          name={profile.fullName}
          desc={profile.idNumber}
          photo={profile.photo}
        />
      )}
      <Gap height={14} />
      <List
        name="Ubah Profil"
        desc={`Terakhir diperbarui ${moment(profile.updatedAt).format(
          'DD MMMM YYYY'
        )}`}
        type="next"
        icon="edit-profile"
        onPress={() =>
          navigation.navigate(routeConstant.UPDATEPROFILE, profile)
        }
      />
      <List
        name="Tentang"
        desc="Informasi tentang aplikasi"
        type="next"
        icon="rate"
        onPress={() => navigation.navigate(routeConstant.ABOUTAPP, profile)}
      />
      <List
        name="Keluar"
        desc="Keluar dari aplikasi"
        type="next"
        icon="logout"
        onPress={onSignOut}
      />
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: 'white' }
});
