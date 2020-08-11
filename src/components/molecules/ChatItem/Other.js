import { React, PropTypes, StyleSheet, Text, View, Image } from '@libraries';
import { colors, fonts } from '@utils';
import { DummyDoctor9 } from '@assets';

const Other = ({ name, text, date, photo, simple }) => {
  if (simple) {
    return (
      <View style={styles.simpleContainer}>
        <View>
          <Text style={styles.simpleName}>{name}:</Text>
        </View>
        <View style={styles.simpleChatContent}>
          <Text style={styles.simpleText}>{text}</Text>
        </View>
        <View>
          <Text style={styles.simpleDate}>{date}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={photo} style={styles.avatar} />
      <View>
        <View style={styles.chatContent}>
          <Text style={styles.text}>{text}</Text>
        </View>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
};

Other.propTypes = {
  name: PropTypes.string,
  text: PropTypes.string,
  date: PropTypes.string,
  photo: PropTypes.any,
  simple: PropTypes.bool
};

Other.defaultProps = {
  name: '',
  text: '',
  date: '',
  photo: null,
  simple: false
};

export default React.memo(Other);

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'flex-end',
    paddingLeft: 16,
    flexDirection: 'row'
  },
  avatar: { width: 30, height: 30, borderRadius: 30 / 2, marginRight: 12 },
  chatContent: {
    padding: 15,
    paddingRight: 18,
    backgroundColor: colors.primary,
    maxWidth: '80%',
    borderRadius: 10,
    borderBottomLeftRadius: 0,
    marginRight: 26
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.white
  },
  date: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary,
    marginTop: 8
  },
  simpleContainer: {
    alignItems: 'flex-start',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  simpleText: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.black
  },
  simpleChatContent: {
    flex: 1
  },
  simpleDate: {
    fontSize: 11,
    fontFamily: fonts.primary.normal,
    color: colors.text.secondary
  },
  simpleName: {
    marginRight: 8,
    fontWeight: 'bold'
  }
});
