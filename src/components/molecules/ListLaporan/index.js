import { StyleSheet, Text, View, Image, React, PropTypes } from '@libraries';
import { colors, fonts } from '@utils';

const ListLaporan = ({ type, name, date, pic }) => {
  return (
    <View style={styles.conteiner}>
      <Image source={pic} style={styles.image} />
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.title}>{type}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

ListLaporan.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  date: PropTypes.string,
  pic: PropTypes.any
};

ListLaporan.defaultProps = {
  type: '',
  name: '',
  date: '',
  pic: null
};

export default React.memo(ListLaporan);

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80,
    borderRadius: 11,
    marginRight: 16
  },
  conteiner: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary
  },
  date: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    marginTop: 6
  }
});
