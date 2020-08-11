import { Image, StyleSheet, Text, View, React, PropTypes } from '@libraries';
import { colors, fonts } from '@utils';

const NewsItem = ({ name, desc, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{desc}</Text>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

NewsItem.propTypes = {
  name: PropTypes.string,
  desc: PropTypes.string,
  image: PropTypes.any
};

NewsItem.defaultProps = {
  name: '',
  desc: '',
  image: null
};

export default React.memo(NewsItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
    paddingTop: 16,
    paddingHorizontal: 16
  },
  titleWrapper: { flex: 1 },
  title: {
    fontSize: 16,
    fontFamily: fonts.primary[600],
    color: colors.text.primary,
    maxWidth: '90%'
  },
  name: {
    fontSize: 12,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 4
  },
  image: { width: 80, height: 60, borderRadius: 11 }
});
