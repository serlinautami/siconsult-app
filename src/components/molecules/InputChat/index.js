import { StyleSheet, TextInput, View, React, PropTypes } from '@libraries';
import { colors, fonts } from '@utils';
import { Button } from '@components/atoms';

const InputChat = ({ value, onChangeText, onButtonPress, targetChat }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={`Tulis Pesan Untuk ${targetChat.role}`}
        value={value}
        onChangeText={onChangeText}
      />
      <Button
        disable={value.length < 1}
        type="btn-icon-send"
        onPress={onButtonPress}
      />
    </View>
  );
};

InputChat.propTypes = {
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onButtonPress: PropTypes.func,
  targetChat: PropTypes.object.isRequired
};

InputChat.defaultProps = {
  value: '',
  onButtonPress: () => {},
  onChangeText: () => {}
};

export default InputChat;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    backgroundColor: colors.white
  },
  input: {
    backgroundColor: colors.disable,
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    fontSize: 14,
    fontFamily: fonts.primary.normal,
    maxHeight: 50
  }
});
