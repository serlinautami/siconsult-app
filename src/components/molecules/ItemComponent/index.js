import {
  StyleSheet,
  Text,
  View,
  React,
  PropTypes,
  TouchableOpacity,
  useState,
  Image
} from '@libraries';
import { IconNext } from '@assets';
import { colors, fonts } from '@utils';

const ItemComponent = ({
  label,
  value,
  dropdown,
  onPress,
  isOpen,
  children,
  noBorder,
  noLabel,
  image,
  next,
  canPressed,
  reverse,
  customNext
}) => {
  const [showDropdown, setDropdown] = useState(isOpen || false);

  const toggle = open => {
    onPress();
    setDropdown(open);
  };

  if (dropdown) {
    return (
      <View
        style={[
          styles.containerDropdown,
          { ...(noBorder && styles.noBorder) }
        ]}>
        <TouchableOpacity
          style={styles.touchableDropdown}
          onPress={() => toggle(!showDropdown)}>
          {!noLabel && <Text style={styles.label}>{label}</Text>}
          <Text style={styles.value}>{value}</Text>
        </TouchableOpacity>
        {showDropdown && <View style={styles.contentDropdown}>{children}</View>}
      </View>
    );
  }

  const Wrapper = canPressed ? TouchableOpacity : View;

  return (
    <Wrapper
      onPress={onPress}
      style={[styles.container, { ...(noBorder && styles.noBorder) }]}>
      {reverse ? (
        <View style={styles.content}>
          <Text style={styles.valueReverse}>{value}</Text>
          {!noLabel && <Text style={styles.labelReverse}>{label}</Text>}
        </View>
      ) : (
        <View style={styles.content}>
          {!noLabel && <Text style={styles.label}>{label}</Text>}
          <Text style={styles.value}>{value}</Text>
        </View>
      )}
      {next && <IconNext />}
      {customNext}
    </Wrapper>
  );
};

ItemComponent.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  dropdown: PropTypes.bool,
  onPress: PropTypes.func,
  isShow: PropTypes.bool,
  children: PropTypes.any,
  noBorder: PropTypes.bool,
  noLabel: PropTypes.bool,
  image: PropTypes.any,
  next: PropTypes.bool,
  canPressed: PropTypes.bool,
  reverse: PropTypes.bool,
  customNext: PropTypes.any
};

ItemComponent.defaultProps = {
  label: '',
  value: '',
  image: null,
  dropdown: false,
  isOpen: false,
  noBorder: false,
  noLabel: false,
  next: false,
  reverse: false,
  canPressed: false,
  customNext: null,
  onPress: () => {}
};

export default React.memo(ItemComponent);

const styles = StyleSheet.create({
  containerDropdown: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  touchableDropdown: {
    padding: 16
  },
  contentDropdown: {
    backgroundColor: colors.disable
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  content: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {},
  withImage: {},
  label: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginBottom: 6
  },
  labelReverse: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary
  },
  value: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary
  },
  valueReverse: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    marginBottom: 6
  },
  noBorder: {
    borderBottomWidth: 0
  }
});
