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
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSubmit = () => {
    setIsSaved(true);
  };

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
    handleSubmit();
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
      <View style={styles.buttonBox}>
      <Button
        title="Click here"
        onPress={Submit}
        color='darkblue'
      />
      </View>
      {isSaved && <Text style={styles.boldText}>Saved!</Text>}
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
    color: 'darkblue',
    padding: 5,
  },
  buttonBox: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: 'crimson',
  },
});

export default LogInPage;
