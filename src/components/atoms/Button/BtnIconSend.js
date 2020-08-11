import {
  React,
  StyleSheet,
  View,
  TouchableOpacity,
  PropTypes
} from '@libraries';
import { IconSendDark, IconSendLight } from '@assets';
import { colors } from '@utils';

const BtnIconSend = ({ disable, onPress }) => {
  if (disable) {
    return (
      <View style={styles.container(disable)}>
        <IconSendDark />
      </View>
    );
  }
  return (
    <TouchableOpacity style={styles.container(disable)} onPress={onPress}>
      <IconSendLight />
    </TouchableOpacity>
  );
};

BtnIconSend.propTypes = {
  disable: PropTypes.bool,
  onPress: PropTypes.func
};

BtnIconSend.defaultProps = {
  disable: false,
  onPress: () => {}
};

export default React.memo(BtnIconSend);

const styles = StyleSheet.create({
  container: disable => ({
    backgroundColor: disable ? colors.disable : colors.tertiary,
    width: 45,
    height: 45,
    borderRadius: 10,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 8,
    paddingLeft: 8
  })
});
