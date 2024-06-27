import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { useValue } from './ValueContext';
import theme from './Theme';

function LogInPage({ navigation }) {
  const {
    currentUsername,
    setCurrentUsername,
    joinedClubs,
    setJoinedClubs,
  } = useValue();

  const [numClubsJoined, setNumClubsJoined] = useState(0);

  const NumClubsJoinedChange = (text) => {
    setNumClubsJoined(parseInt(text));
  };

  const ClubInputChange = (text, index) => {
    const newJoinedClubs = [...joinedClubs];
    newJoinedClubs[index] = text;
    setJoinedClubs(newJoinedClubs);
  };

  const ClubInputs = () => {
    const clubInputs = [];
    for (let i = 0; i < numClubsJoined; i++) {
      clubInputs.push(
        <TextInput
          key={i}
          style={styles.boldText}
          value={joinedClubs[i]}
          onChangeText={(text) => ClubInputChange(text, i)}
          placeholder={`Club ${i + 1} Name`}
        />
      );
    }
    return clubInputs;
  };

  const Submit = () => {
    console.log('Username:', currentUsername);
    console.log('Number of clubs joined:', numClubsJoined);
    console.log('Joined clubs:', joinedClubs);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.boldText}
        placeholder="Enter username"
        value={currentUsername}
        onChangeText={(text) => setCurrentUsername(text)}
      />
      <Text style={styles.boldText}>Your username: {currentUsername}</Text>
      <TextInput
        style={styles.boldText}
        onChangeText={NumClubsJoinedChange}
        keyboardType="numeric"
        placeholder="Number of clubs joined:"
      />
      {ClubInputs()}
      <Button
        title="Click here"
        onPress={Submit}
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
    padding: 5,
  },
});

export default LogInPage;
