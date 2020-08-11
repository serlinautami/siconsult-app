import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  React,
  PropTypes
} from '@libraries';
import { colors, fonts } from '@utils';
import {
  IconNext,
  IconEditProfile,
  IconLanguage,
  IconRate,
  IconLogout,
  ILNullPhoto,
  ILPlnAkademik,
  ILPlnKeuangan,
  ILPlnBimbingan
} from '@assets';

const ListGroup = ({ category, itemList, title, icon, type, onPress }) => {
  if (!itemList || itemList.length === 0) {
    return null;
  }

  const renderImage = () => {
    const list = [...itemList];
    return (
      <View style={styles.avatarWrapper}>
        {list.map((item, index) => {
          const image =
            item?.receiver?.photo?.length > 1
              ? { uri: item.receiver.photo }
              : ILNullPhoto;

          if (index > 9) {
            return null;
          }

          if (index === 9) {
            return (
              <View
                key={`${item.id}-${index}`}
                style={{
                  ...styles.avatar,
                  left: 0 + index * 18
                }}>
                <Text style={styles.count}>{`+${list.length - index}`}</Text>
              </View>
            );
          }

          return (
            <Image
              key={`${index}-${item.id}`}
              source={image}
              style={{
                ...styles.avatar,
                left: 0 + index * 18
              }}
            />
          );
        })}
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.name}>{title}</Text>
        {renderImage()}
      </View>
      {type === 'next' ? <IconNext /> : null}
    </TouchableOpacity>
  );
};

ListGroup.propTypes = {
  itemList: PropTypes.array,
  title: PropTypes.string,
  onPress: PropTypes.func,
  type: PropTypes.string,
  icon: PropTypes.string,
  category: PropTypes.string
};

ListGroup.defaultProps = {
  itemList: [],
  title: '',
  type: '',
  icon: '',
  category: '',
  onPress: () => {}
};

export default React.memo(ListGroup);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  content: { flex: 1 },
  avatarWrapper: {
    position: 'relative',
    height: 32,
    marginBottom: 8
  },
  avatar2: {
    position: 'relative',
    width: 46,
    height: 46,
    borderRadius: 46 / 2
  },
  count: {
    fontSize: 12
  },
  avatar: {
    backgroundColor: colors.border,
    width: 32,
    height: 32,
    borderRadius: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.primary,
    marginBottom: 8
  },
  desc: {
    fontSize: 12,
    fontFamily: fonts.primary[300],
    color: colors.text.secondary,
    textTransform: 'capitalize'
  }
});
