import { React, createBottomTabNavigator } from '@libraries';
import { BottomNavigator } from '@components';
import { Home, Messages, Laporan } from '@pages';

import { routeConstant } from '@utils';

const Tab = createBottomTabNavigator();

/**
 * Navigation untuk tab halaman depan
 */
const Dashboard = ({ route }) => {
  const { isAdmin } = route.params;

  const dashboardRoutes = [
    { name: routeConstant.HOME, component: Home },
    { name: routeConstant.MESSAGES, component: Messages }
  ];

  if (isAdmin) {
    dashboardRoutes[2] = { name: routeConstant.LAPORAN, component: Laporan };
  }

  return (
    <Tab.Navigator tabBar={tabProps => <BottomNavigator {...tabProps} />}>
      {dashboardRoutes.map(({ name, component }, index) => {
        return (
          <React.Fragment key={index}>
            <Tab.Screen name={name} component={component} />
          </React.Fragment>
        );
      })}
    </Tab.Navigator>
  );
};

export { Dashboard };
