import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import theme from './Theme'; 

function AboutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.italicText}>A Small Guide About Using MyDeisCommunity</Text>
      <Text style={styles.boldText}>1. Log in with your name and click the button underneath.</Text>
      <Text style={styles.boldText}>2. Enter your major and interest/s and click 'submit'.</Text>
      <Text style={styles.boldText}>3. You will get a list of all the clubs/organizations that you might love!</Text>
      <Text style={styles.boldText}>4. Have fun!!</Text>
      <Button
        title="Log In/Sign up"
        onPress={() => navigation.navigate('Your Info')}
        color={theme.colors.primary} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, 
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.text, 
    padding: 5,
  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 30,
    textAlign: 'center',
    color: theme.colors.text, 
    padding: 7,
  },
});

export default AboutScreen;