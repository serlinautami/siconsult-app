import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  React,
  PropTypes
} from '@libraries';
import { colors, fonts } from '@utils';
import { IconEdit, IconRemove, IconAdd, IconNext } from '@assets';

const ListMasalah = ({ onPressEdit, onPressDelete, onPress, title }) => {
  const isShowEdit = onPressEdit || onPressDelete;
  const Wrapper = isShowEdit ? View : TouchableOpacity;

  return (
    <Wrapper style={styles.container} onPress={onPress}>
      {isShowEdit ? (
        <TouchableOpacity onPress={onPress} style={styles.content}>
          <Text style={styles.name}>{title}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.content}>
          <Text style={styles.name}>{title}</Text>
        </View>
      )}
      {onPressEdit && (
        <TouchableOpacity style={styles.editIcon} onPress={onPressEdit}>
          <IconEdit />
        </TouchableOpacity>
      )}
      {onPressDelete && (
        <TouchableOpacity onPress={onPressDelete}>
          <IconRemove />
        </TouchableOpacity>
      )}
      {!onPressEdit && !onPressDelete ? <IconNext /> : null}
    </Wrapper>
  );
};

ListMasalah.propTypes = {
  onPressEdit: PropTypes.func,
  onPressDelete: PropTypes.func,
  onPress: PropTypes.func
};

ListMasalah.defaultProps = {
  onPressEdit: null,
  onPressDelete: null,
  onPress: () => {}
};

export default React.memo(ListMasalah);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: { flex: 1, marginLeft: 16 },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary
  },
  tombol: {
    flexDirection: 'row',
    padding: 17,
    justifyContent: 'flex-end'
  },
  editIcon: {
    marginRight: 8
  }
});
