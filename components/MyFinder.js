import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList } from 'react-native';
import { useValue } from './ValueContext';
import clubs from '../assests/clubs.json';
import theme from './Theme'; 

function MyFinder() {
    const { currentUsername, currentMajor, setCurrentUsername, setCurrentMajor } = useValue(); 
    const [numInterests, setNumInterests] = useState(0);
    const [interests, setInterests] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [matchingClubs, setMatchingClubs] = useState([]);
    const [interestsString, setInterestsString] = useState('');

    const NumInterestsChange = (text) => {
        setNumInterests(parseInt(text));
    };

    const InterestsChange = (text, index) => {
        const newInterests = [...interests];
        newInterests[index] = text;
        setInterests(newInterests);
    };

    const InterestsInputs = () => {
        const interestInputs = [];
        for (let i = 0; i < numInterests; i++) {
            interestInputs.push(
                <TextInput
                    key={i}
                    style={styles.boldText}
                    value={interests[i]}
                    onChangeText={(text) => InterestsChange(text, i)}
                    placeholder={'Enter your interest:'}
                />
            );
        }
        return interestInputs;
    };

    const Submit = () => {
        const interestsJoined = interests.join(', ');
        setInterestsString(interestsJoined);
        console.log('Submitted major:', currentMajor);
        console.log('Submitted interests:', interestsJoined);
        const filteredClubs = clubs.filter(club =>
            club["key words"].includes(currentMajor) ||
            interests.some(interest => club["key words"].includes(interest))
        );
        setMatchingClubs(filteredClubs);
        setSubmitted(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.boldText}>Hi, {currentUsername}</Text>
            <TextInput
                style={styles.boldText}
                value={currentMajor}
                onChangeText={(text) => setCurrentMajor(text)}
                placeholder="Enter your major:"
            />
            <TextInput
                style={styles.boldText}
                onChangeText={NumInterestsChange}
                keyboardType="numeric"
                placeholder="Number of interests:"
            />
            {InterestsInputs()}
            <Button title="Submit" onPress={Submit} color={theme.colors.primary}/>
            {submitted && <Text style={styles.boldText}>Your major: {currentMajor}</Text>}
            {submitted && <Text style={styles.boldText}>Your interests are: {interestsString}</Text>}
            {submitted && (
                <View style={styles.matchingClubsContainer}>
                    <Text style={styles.boldText}>Here are some clubs you might want to check out:</Text>
                    <FlatList
                        data={matchingClubs}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.bulletText}>• {item.name}</Text>
                        )}
                    />
                </View>
            )}
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
        padding: 5,
        color: theme.colors.text,
    },
    matchingClubsContainer: {
        marginTop: 20,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
    },
    bulletText: {
        fontSize: 23,
        textAlign: 'center',
        color: theme.colors.text,
        paddingLeft: 10,
        fontStyle: 'italic',
    },
});

export default MyFinder;
