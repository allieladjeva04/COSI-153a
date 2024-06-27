import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './HomeScreen';
import LogInPage from './LogInPage';
import AboutScreen from './AboutScreen';
import MyFinder from './MyFinder';
import ValueProvider from './ValueContext';

const Tab = createBottomTabNavigator();

export default function App() {
  const data = { username: 'none', major: 'undecided' };

  return (
    <ValueProvider value={data}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Your Info" component={LogInPage} />
          <Tab.Screen name="MyFinder" component={MyFinder} />
        </Tab.Navigator>
      </NavigationContainer>
    </ValueProvider>
  );
}
