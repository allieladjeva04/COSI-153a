import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider, useTheme } from 'react-native-paper'; 
import theme from './Theme'; 

import HomeScreen from './HomeScreen';
import LogInPage from './LogInPage';
import AboutScreen from './AboutScreen';
import MyFinder from './MyFinder';
import ValueProvider from './ValueContext';

const Tab = createBottomTabNavigator();

const CustomHeader = ({ title }) => {
  const { colors } = useTheme(); // Use useTheme hook to access colors
  return (
    <View style={[styles.headerContainer, { backgroundColor: colors.primary }]}>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
};

export default function App() {
  const data = { username: 'none', major: 'undecided' };

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <ValueProvider value={data}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ route }) => ({
                header: () => <CustomHeader title={route.name} />,
                tabBarStyle: {
                  backgroundColor: useTheme().colors.primary,
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'white',
              })}
            >
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="About" component={AboutScreen} />
              <Tab.Screen name="Your Info" component={LogInPage} />
              <Tab.Screen name="MyFinder" component={MyFinder} />
            </Tab.Navigator>
          </NavigationContainer>
        </ValueProvider>
      </View>
    </PaperProvider>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height * 0.06, 
    width: '100%',
  },
  headerText: {
    padding:9,
    fontSize: width * 0.08,
    color: 'white',
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    bottom: 0,
  },
});
