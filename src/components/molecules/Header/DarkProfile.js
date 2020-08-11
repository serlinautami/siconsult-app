import { React, PropTypes, StyleSheet, Text, View, Image } from '@libraries';
import { colors, fonts } from '@utils';
import { Button } from '@components/atoms';

const DarkProfile = ({ onPress, title, desc, photo }) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <Button type="icon-only" icon="back-light" onPress={onPress} />
      )}
      <View style={styles.contet}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
      </View>
      <Image source={photo} style={styles.avatar} />
    </View>
  );
};

DarkProfile.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.string,
  photo: PropTypes.any,
  backButton: PropTypes.bool
};

DarkProfile.defaultProps = {
  onPress: null,
  title: '',
  desc: '',
  photo: null
};

export default React.memo(DarkProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.secondary,
    paddingVertical: 30,
    paddingLeft: 20,
    paddingRight: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  contet: { flex: 1 },
  avatar: { width: 46, height: 46, borderRadius: 46 / 2 },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.white,
    textAlign: 'center'
  },
  desc: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    marginTop: 6,
    textAlign: 'center',
    color: colors.text.subTitle
  }
});
