import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  React,
  PropTypes
} from '@libraries';
import { IconRemovePhoto } from '@assets';
import { colors, fonts } from '@utils';

const Profile = ({ name, desc, isRemove, photo, onPress, ...props }) => {
  return (
    <View style={styles.container}>
      {!isRemove && (
        <View style={styles.borderProfile}>
          <Image source={photo} style={styles.avatar} />
        </View>
      )}
      {isRemove && (
        <TouchableOpacity style={styles.borderProfile} onPress={onPress}>
          <Image source={photo} style={styles.avatar} />
          {isRemove && <IconRemovePhoto style={styles.removePhoto} />}
        </TouchableOpacity>
      )}
      {name && (
        <View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.idNumber}>{desc}</Text>
        </View>
      )}
    </View>
  );
};

Profile.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  isRemove: PropTypes.bool,
  photo: PropTypes.any,
  onPress: PropTypes.func
};

Profile.defaultProps = {
  name: '',
  desc: '',
  isRemove: false,
  photo: null,
  onPress: () => {}
};

export default React.memo(Profile);

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  avatar: { width: 110, height: 110, borderRadius: 110 / 2 },
  borderProfile: {
    width: 130,
    height: 130,
    borderRadius: 130 / 2,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center'
  },
  idNumber: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.secondary,
    marginTop: 2,
    textAlign: 'center'
  },
  removePhoto: { position: 'absolute', right: 8, bottom: 8 }
});
