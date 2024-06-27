import React from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { useValue } from './ValueContext';
import theme from './Theme'; 

function HomeScreen({ navigation }) {
  const { currentUsername = '', currentMajor = '', joinedClubs = [], clearData } = useValue();
  const renderJoinedClubs = () => {
    if (joinedClubs.length === 0) return null;
    return joinedClubs.join(', ');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Welcome to MyDeisCommunity!</Text>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/32/Brandeis_University_seal.svg/640px-Brandeis_University_seal.svg.png' }}
        style={styles.image}
      />
      <Text style={styles.italicText}>Do you want to find your community on campus?</Text>
      <Text style={styles.italicText}>Do you want to meet people who share the same passions as you?</Text>
      <Text style={styles.italicText}>Do you want to be more involved in the Brandeis community?</Text>
      <Text style={styles.boldText1}>
        Just as Mickey Mouse has Toodles, now you have MyDeisCommunity in your pocket!
        The app will help you to find clubs and organizations on campus that match your major/s and passions! :))
      </Text>
      <Button
        title="How to use MyDeisCommunity"
        onPress={() => navigation.navigate('About')}
        color={theme.colors.primary}
      />
      <Button
        title="Log In/Sign up"
        onPress={() => navigation.navigate('Your Info')}
        color={theme.colors.primary}
      />
      <Text style={styles.italicText}>Username: {currentUsername}</Text>
      <Text style={styles.italicText}>Major: {currentMajor}</Text>
      {joinedClubs.length > 0 && (
        <Text style={styles.italicText}>Joined Clubs: {renderJoinedClubs()}</Text>
      )}
       <Button
        title="Clear Data"
        onPress={clearData}
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
    fontSize: 25,
    textAlign: 'center',
    color: theme.colors.text,
    paddingVertical: 5,
  },
  boldText1: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.text,
    paddingVertical: 5,
  },
  italicText: {
    fontStyle: 'italic',
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.text,
    paddingVertical: 5,
  },
  containerText: {
    textAlign: 'center',
    fontSize: 15,
    color: theme.colors.text,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default HomeScreen;
