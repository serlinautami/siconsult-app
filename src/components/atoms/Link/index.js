import {
  React,
  PropTypes,
  StyleSheet,
  Text,
  TouchableOpacity
} from '@libraries';
import { colors, fonts } from '@utils';

const Link = ({ title, size, align, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text(size, align)}>{title}</Text>
    </TouchableOpacity>
  );
};

Link.propTypes = {
  title: PropTypes.string,
  size: PropTypes.number.isRequired,
  align: PropTypes.string,
  onPress: PropTypes.func
};

Link.defaultProps = {
  tile: '',
  align: 'left',
  onPress: () => {}
};

export default React.memo(Link);

const styles = StyleSheet.create({
  text: (size, align) => ({
    fontSize: size,
    color: colors.text.secondary,
    fontFamily: fonts.primary.normal,
    textDecorationLine: 'underline',
    textAlign: align
  })
});
