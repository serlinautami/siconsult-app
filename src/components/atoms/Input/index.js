import {
  Text,
  View,
  React,
  PropTypes,
  useState,
  StyleSheet,
  TextInput,
  Picker
} from '@libraries';
import { colors, fonts } from '@utils';

const Input = ({
  label,
  value,
  onChangeText,
  secureTextEntry,
  disable,
  select,
  onValueChange,
  selectItem,
  placeholder,
  maxLength,
  keyboardType,
  inputProps,
  style
}) => {
  const [border, setBorder] = useState(colors.border);
  const onFocusForm = () => {
    setBorder(colors.tertiary);
  };
  const onBlurForm = () => {
    setBorder(colors.border);
  };

  if (select) {
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.picker}>
          <Picker selectedValue={value} onValueChange={onValueChange}>
            {selectItem.map(item => {
              return (
                <Picker.Item
                  key={item.id}
                  label={item.label}
                  value={item.value}
                />
              );
            })}
          </Picker>
        </View>
      </View>
    );
  }
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        style={[styles.input(border), style]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        editable={!disable}
        selectTextOnFocus={!disable}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        {...inputProps}
      />
    </View>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  select: PropTypes.bool,
  disable: PropTypes.bool,
  maxLength: PropTypes.number,
  selectItem: PropTypes.array,
  placeholder: PropTypes.string,
  keyboardType: PropTypes.string,
  onChangeText: PropTypes.func,
  onValueChange: PropTypes.func,
  secureTextEntry: PropTypes.bool,
  inputProps: PropTypes.object,
  style: PropTypes.any
};

Input.defaultProps = {
  label: '',
  value: '',
  select: false,
  disable: false,
  maxLength: null,
  selectItem: [],
  placeholder: '',
  keyboardType: 'default',
  secureTextEntry: false,
  inputProps: {},
  onChangeText: () => {},
  onValueChange: () => {}
};

export default Input;

const styles = StyleSheet.create({
  input: border => ({
    borderWidth: 1,
    borderColor: border,
    borderRadius: 10,
    padding: 12
  }),
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 6,
    fontFamily: fonts.primary[400]
  },
  picker: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 4
  }
});
