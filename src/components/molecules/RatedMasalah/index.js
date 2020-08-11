import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  React,
  PropTypes
} from '@libraries';
import { IconStar } from '@assets';
import { colors, fonts } from '@utils';

const RatedMasalah = ({ onPress, catagory, tentang }) => {
  let data = [];
  Object.keys(tentang).map(key => {
    data.push({
      id: key,
      ...tentang[key]
    });
  });
  let rate = 0;
  let detail = '';
  data.map(item => {
    if (rate < item.rate) {
      rate = item.rate;
      detail = item.id;
    }
  });
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.profile}>
        <Text style={styles.name}>{catagory}</Text>
        <Text style={styles.category}>{detail}</Text>
      </View>
      <View style={styles.rate}>
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
        <IconStar />
      </View>
    </TouchableOpacity>
  );
};

RatedMasalah.propTypes = {
  onPress: PropTypes.func,
  catagory: PropTypes.string,
  tentang: PropTypes.any
};
RatedMasalah.defaultProps = {
  category: '',
  tentang: null,
  onPress: () => {}
};

export default React.memo(RatedMasalah);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
    alignItems: 'center'
  },
  rate: { flexDirection: 'row' },
  profile: { flex: 1 },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  },
  category: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 2
  }
});
