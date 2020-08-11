import { React, TouchableOpacity, PropTypes } from '@libraries';
import { IconBackDark, IconBackLight, IconAdd } from '@assets';

const IconOnly = ({ onPress, icon, style, iconStyle }) => {
  const Icon = () => {
    if (icon === 'back-dark') {
      return <IconBackDark />;
    }
    if (icon === 'back-light') {
      return <IconBackLight />;
    }
    if (icon === 'plus') {
      return <IconAdd />;
    }
    return <IconBackDark />;
  };
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      <Icon />
    </TouchableOpacity>
  );
};

IconOnly.propTypes = {
  icon: PropTypes.string,
  onPress: PropTypes.func,
  iconStyle: PropTypes.any,
  style: PropTypes.any
};

IconOnly.defaultProps = {
  icon: '',
  onPress: () => {}
};

export default React.memo(IconOnly);
