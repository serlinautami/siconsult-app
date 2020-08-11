import {
  React,
  StyleSheet,
  Text,
  TouchableOpacity,
  PropTypes,
  View
} from '@libraries';
import { ILPlnAkademik, ILPlnKeuangan, ILPlnBimbingan } from '@assets';
import { colors, fonts } from '@utils';

const CatagoryMasalah = ({ id, name, onPress, label }) => {
  const Icon = () => {
    if (id === 'akademik') {
      return <ILPlnAkademik style={styles.illustration} />;
    }
    if (id === 'keuangan') {
      return <ILPlnKeuangan style={styles.illustration} />;
    }
    if (id === 'bimbingan') {
      return <ILPlnBimbingan style={styles.illustration} />;
    }
    return <ILPlnAkademik style={styles.illustration} />;
  };
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconHolder}>
        <Icon />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.category}>{name}</Text>
    </TouchableOpacity>
  );
};

CatagoryMasalah.propTypes = {
  catagory: PropTypes.string,
  onPress: PropTypes.func
};

CatagoryMasalah.defaultProps = {
  catagory: '',
  onPress: () => {}
};

export default React.memo(CatagoryMasalah);

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: colors.cardLight,
    borderRadius: 10,
    marginRight: 10,
    width: '100%',
    height: 150
  },
  iconHolder: {
    alignItems: 'center'
  },
  illustration: { marginBottom: 28 },
  label: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.primary[300],
    color: colors.text.primary
  },
  category: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fonts.primary[600],
    color: colors.text.primary
  }
});
