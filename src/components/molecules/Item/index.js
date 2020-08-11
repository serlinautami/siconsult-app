import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  React,
  PropTypes
} from '@libraries';
import { IconRemovePhoto } from '@assets';
import { colors, fonts } from '@utils';

const Item = ({ catagory }) => {
  return (
    <View style={styles.container}>
      {catagory && (
        <View>
          <Text style={styles.name}>{catagory}</Text>
        </View>
      )}
    </View>
  );
};

Item.propTypes = {
  catagory: PropTypes.string
};

Item.defaultProps = {
  catagory: ''
};

export default React.memo(Item);

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },
  name: {
    fontSize: 20,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    marginTop: 16,
    textAlign: 'center'
  }
});
