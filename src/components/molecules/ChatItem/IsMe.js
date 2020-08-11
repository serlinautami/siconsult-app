import { React, StyleSheet, Text, View, PropTypes } from '@libraries';
import { colors, fonts } from '@utils';

const IsMe = ({ simple, name, text, date }) => {
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
      <View style={styles.chatContent}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

IsMe.propTypes = {
  text: PropTypes.string,
  date: PropTypes.string,
  simple: PropTypes.bool,
  name: PropTypes.string
};

IsMe.defaultProps = {
  text: '',
  date: '',
  simple: false,
  name: ''
};

export default React.memo(IsMe);

const styles = StyleSheet.create({
  container: { marginBottom: 20, alignItems: 'flex-end', paddingRight: 16 },
  chatContent: {
    padding: 12,
    paddingRight: 18,
    backgroundColor: colors.cardLight,
    maxWidth: '70%',
    borderRadius: 10,
    borderBottomRightRadius: 0
  },
  text: {
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary
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
