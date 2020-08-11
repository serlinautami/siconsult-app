import { StyleSheet, Text, View, React, PropTypes } from '@libraries';
import { colors, fonts } from '@utils';
import { Button, Gap } from '@components/atoms';
import DarkProfile from './DarkProfile';

const Header = ({ onPress, title, type, photo, desc }) => {
  if (type === 'dark-profile') {
    return (
      <DarkProfile onPress={onPress} title={title} desc={desc} photo={photo} />
    );
  }
  return (
    <View style={styles.container(type)}>
      {onPress && (
        <Button
          type="icon-only"
          icon={type === 'dark' ? 'back-light' : 'back-dark'}
          onPress={onPress}
        />
      )}
      <Text style={styles.text(type)}>{title}</Text>
      <Gap width={24} />
    </View>
  );
};

Header.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  desc: PropTypes.string,
  type: PropTypes.string,
  photo: PropTypes.any
};

Header.defaultProps = {
  onPress: null,
  title: '',
  desc: '',
  type: '',
  photo: null
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: type => ({
    paddingHorizontal: 16,
    paddingVertical: 30,
    backgroundColor: type === 'dark' ? colors.secondary : colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomLeftRadius: type === 'dark' ? 20 : 0,
    borderBottomRightRadius: type === 'dark' ? 20 : 0
  }),
  text: type => ({
    textAlign: 'center',
    flex: 1,
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: type === 'dark' ? colors.white : colors.text.primary,
    textTransform: 'capitalize'
  })
});
