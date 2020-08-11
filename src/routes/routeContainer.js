import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import mainRoutes from './mainRoutes';
import { routeConstant } from '@utils';

const Stack = createStackNavigator();

/**
 * App Route sebagai router container. Semua router akan berakhir disini
 */
const AppRoute = () => {
  return (
    <Stack.Navigator initialRouteName={routeConstant.SPLASH}>
      {mainRoutes.map(({ name, component, options, initialParams }, index) => {
        return (
          <React.Fragment key={index}>
            <Stack.Screen
              name={name}
              component={component}
              options={options}
              initialParams={initialParams}
            />
          </React.Fragment>
        );
      })}
    </Stack.Navigator>
  );
};

export { AppRoute };
