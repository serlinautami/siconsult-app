import { React, StyleSheet, View, PropTypes } from '@libraries';
import { colors } from '@utils';
import { TabItem } from '@components/atoms';

const BottomNavigator = ({ state, descriptors, navigation }) => {
  return (
    <View
      style={[
        styles.container,
        {
          ...(state.routes.length === 2 && styles.spaceAround)
        }
      ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <TabItem
            key={index}
            title={label}
            active={isFocused}
            onPress={onPress}
            onLongPress={onLongPress}
          />
        );
      })}
    </View>
  );
};

BottomNavigator.propTypes = {
  state: PropTypes.any,
  descriptors: PropTypes.any,
  navigation: PropTypes.any
};

export default React.memo(BottomNavigator);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 53,
    paddingVertical: 12,
    backgroundColor: colors.secondary
  },
  spaceAround: {
    justifyContent: 'space-around'
  }
});
