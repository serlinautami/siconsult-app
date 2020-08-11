import {
  React,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity
} from '@libraries';
import {
  IconMessages,
  IconMessagesActive,
  IconHome,
  IconHomeActive,
  IconLaporanActive,
  IconLaporan
} from '@assets';
import { colors, fonts } from '@utils';

const TabItem = ({ title, active, onPress, onLongPress }) => {
  const Icon = () => {
    if (title === 'Home') {
      return active ? <IconHomeActive /> : <IconHome />;
    }
    if (title === 'Messages') {
      return active ? <IconMessagesActive /> : <IconMessages />;
    }
    if (title === 'Laporan') {
      return active ? <IconLaporanActive /> : <IconLaporan />;
    }
    return <IconHome />;
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text style={styles.text(active)}>{title}</Text>
    </TouchableOpacity>
  );
};

TabItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onPress: PropTypes.func,
  onLongPress: PropTypes.func
};

TabItem.defaultProps = {
  title: '',
  active: false,
  onPress: () => {},
  onLongPress: () => {}
};

export default React.memo(TabItem);

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  text: active => ({
    fontSize: 10,
    color: active ? colors.text.menuActive : colors.text.menuInactive,
    fontFamily: fonts.primary[600],
    marginTop: 4
  })
});
