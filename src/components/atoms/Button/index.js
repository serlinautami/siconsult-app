import {
  Text,
  View,
  React,
  PropTypes,
  StyleSheet,
  TouchableOpacity
} from '@libraries';
import { colors, fonts } from '@utils';
import IconOnly from './IconOnly';
import BtnIconSend from './BtnIconSend';

const Button = ({
  type,
  title,
  onPress,
  icon,
  disable,
  btnStyle,
  iconStyle
}) => {
  if (type === 'btn-icon-send') {
    return <BtnIconSend disable={disable} onPress={onPress} />;
  }
  if (type === 'icon-only') {
    return (
      <IconOnly
        icon={icon}
        onPress={onPress}
        style={btnStyle}
        iconStyle={iconStyle}
      />
    );
  }
  if (disable) {
    return (
      <View style={styles.disableBg}>
        <Text style={styles.disableText}>{title}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(type)} onPress={onPress}>
      <Text style={styles.text(type)}>{title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  type: PropTypes.string,
  title: PropTypes.string,
  disable: PropTypes.bool,
  onPress: PropTypes.func,
  btnStyle: PropTypes.any,
  iconStyle: PropTypes.any
};

Button.defaultProps = {
  type: '',
  title: '',
  icon: '',
  disable: false,
  onPress: () => {}
};

export default React.memo(Button);

const styles = StyleSheet.create({
  container: type => ({
    backgroundColor:
      type === 'secondary'
        ? colors.button.secondary.background
        : colors.button.primary.background,
    paddingVertical: 10,
    borderRadius: 10
  }),
  disableBg: {
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.button.disable.background
  },
  text: type => ({
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color:
      type === 'secondary'
        ? colors.button.secondary.text
        : colors.button.primary.text
  }),
  disableText: {
    fontSize: 18,
    fontFamily: fonts.primary[600],
    textAlign: 'center',
    color: colors.button.disable.text
  }
});
