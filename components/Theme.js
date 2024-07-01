import {DefaultTheme } from 'react-native-paper';
import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const theme = {
  ... DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'crimson',
    accent: 'crimson',
    background: 'lightblue',
    text: 'darkblue',
  },
};
export default theme;