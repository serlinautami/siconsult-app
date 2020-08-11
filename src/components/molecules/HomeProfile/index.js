import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  React,
  PropTypes
} from '@libraries';
import { colors, fonts } from '@utils';

const HomeProfile = ({ onPress, profile }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={profile.photo} style={styles.avatar} />
      <View>
        <Text style={styles.name}>{profile.fullName}</Text>
        <Text style={styles.rule}>{profile.idNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

HomeProfile.propTypes = {
  onPress: PropTypes.func,
  profile: PropTypes.object.isRequired
};

HomeProfile.defaultProps = {
  onPress: () => {}
};

export default React.memo(HomeProfile);

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2, marginRight: 12 },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    textTransform: 'capitalize'
  },
  rule: {
    fontSize: 12,
    fontFamily: fonts.primary[400],
    color: colors.text.secondary,
    textTransform: 'capitalize'
  }
});
