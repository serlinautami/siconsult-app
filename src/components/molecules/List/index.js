import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  React,
  PropTypes
} from '@libraries';
import { colors, fonts } from '@utils';
import {
  IconNext,
  IconEditProfile,
  IconLanguage,
  IconRate,
  IconLogout,
  IconLaporan,
  IconReport
} from '@assets';

const List = ({ profile, name, desc, type, onPress, icon }) => {
  const Icon = () => {
    if (icon === 'edit-profile') {
      return <IconEditProfile />;
    }
    if (icon === 'language') {
      return <IconLanguage />;
    }
    if (icon === 'rate') {
      return <IconRate />;
    }
    if (icon === 'logout') {
      return <IconLogout />;
    }

    if (icon === 'laporan') {
      return <IconReport />;
    }
    return <IconEditProfile />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon ? <Icon /> : <Image source={profile} style={styles.avatar} />}
      <View style={styles.content}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      {type === 'next' && <IconNext />}
    </TouchableOpacity>
  );
};

List.propTypes = {
  profile: PropTypes.any,
  name: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  onPress: PropTypes.func,
  icon: PropTypes.string
};

List.defaultProps = {
  profile: null,
  name: '',
  desc: '',
  type: '',
  icon: '',
  onPress: () => {}
};

export default React.memo(List);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: { flex: 1, marginLeft: 16 },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2 },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    textTransform: 'capitalize'
  }
});
