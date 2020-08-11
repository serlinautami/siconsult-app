import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    React,
    PropTypes
  } from '@libraries';
  import { colors, fonts } from '@utils';
  import { IconEdit,IconRemove, IconAdd } from '@assets';
  
  const catagorylist = ({ data, isShowdEdit,isShowDelete, onPress }) => {
    if (!data) {
      return null;
    }
    const { tentang } = data;
    const Wrapper = isShowdEdit ? View : TouchableOpacity; isShowDelete ? View : TouchableOpacity
  
    return (
      <Wrapper style={styles.container} onPress={onPress}>
        <View style={styles.content}>
          <Text style={styles.name}>{tentang}</Text>
        </View>
        <TouchableOpacity>
        {isShowdEdit && <IconRemove />}
        </TouchableOpacity>
        <TouchableOpacity>
        {isShowDelete && <IconEdit />}
        </TouchableOpacity>
      </Wrapper>  
    );
  };
  
  
  catagorylist.propTypes = {
    data: PropTypes.any,
    isShowdEdit: PropTypes.string,
    isShowDelete: PropTypes.string,
    onPress: PropTypes.func
  };
  
  catagorylist.defaultProps = {
    data: null,
    isShowdEdit: '',
    isShowDelete: '',
    onPress: () => {}
  };
  
  export default React.memo(catagorylist);
  
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
      flexDirection: "row",
      padding: 17,
      justifyContent: 'flex-end'
    }
  });
  