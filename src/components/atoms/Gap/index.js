import { React, View, PropTypes } from '@libraries';

const Gap = ({ height, width }) => {
  return <View style={{ height: height, width: width }} />;
};

Gap.propTypes = {
  width: PropTypes.any,
  height: PropTypes.any
};

export default React.memo(Gap);
