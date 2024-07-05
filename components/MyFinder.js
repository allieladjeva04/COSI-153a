import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput, FlatList, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useValue } from './ValueContext';
import theme from './Theme';

const interestsOptions = [
    { label: 'Politics', value: 'Politics' },
    { label: 'Legal Studies', value: 'Legal Studies' },
    { label: 'Law', value: 'Law' },
    { label: 'Computer Science', value: 'Computer Science' },
    { label: 'Robotics', value: 'Robotics' },
    { label: 'Technology', value: 'Technology' },
    { label: 'Education', value: 'Education' },
    { label: 'Activism', value: 'Activism' },
    { label: 'Sports', value: 'Sports' },
    { label: 'Dancing', value: 'Dancing' },
    { label: 'Culture', value: 'Culture' },
    { label: 'Religion', value: 'Religion' },
];

function MyFinder() {
    const { currentUsername, currentMajor, setCurrentUsername, setCurrentMajor, joinedClubs } = useValue();
    const [numInterests, setNumInterests] = useState(0);
    const [interests, setInterests] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [matchingClubs, setMatchingClubs] = useState([]);
    const [interestsString, setInterestsString] = useState('');
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/allieladjeva04/COSI-153a/master/clubsList.json')
            .then(response => response.json())
            .then(data => setClubs(data))
            .catch(error => console.error('Error fetching clubs data:', error));
    }, []);

    const NumInterestsChange = (text) => {
        const num = parseInt(text);
        setNumInterests(num);
        setInterests(new Array(num).fill(''));
    };

    const InterestsChange = (value, index) => {
        const newInterests = [...interests];
        newInterests[index] = value;
        setInterests(newInterests);
    };

    const Submit = () => {
        const interestsJoined = interests.join(', ');
        setInterestsString(interestsJoined);
        console.log('Submitted major:', currentMajor);
        console.log('Submitted interests:', interestsJoined);
        const filteredClubs = clubs.filter(club => 
            (club["keywords"].includes(currentMajor) ||
            interests.some(interest => club["keywords"].includes(interest))) &&
            !joinedClubs.includes(club.name) 
        );
        setMatchingClubs(filteredClubs);
        setSubmitted(true);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
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
            {numInterests > 0 && (
                <View>
                    {interests.map((_, index) => (
                        <RNPickerSelect
                            key={index}
                            onValueChange={(value) => InterestsChange(value, index)}
                            items={interestsOptions}
                            style={pickerSelectStyles}
                            placeholder={{ label: "Select an interest", value: null }}
                        />
                    ))}
                </View>
            )}
            <View style={styles.buttonBox}>
                <Button title="Submit" onPress={Submit} color='darkblue' />
            </View>
            {submitted && <Text style={styles.boldText}>Your major: {currentMajor}</Text>}
            {submitted && <Text style={styles.boldText}>Your interests are: {interestsString}</Text>}
            {submitted && (
                <View style={styles.matchingClubsContainer}>
                    <Text style={styles.boldText}>Here are some clubs you might want to check out:</Text>
                    <FlatList
                        data={matchingClubs}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <Text style={styles.bulletText}>• {item.name}: {item.description}</Text>
                        )}
                        contentContainerStyle={styles.flatListContent}
                    />
                </View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: theme.colors.background,
        paddingHorizontal: 20,
        paddingVertical: 20,
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
        paddingHorizontal: 20,
    },
    flatListContent: {
        flexGrow: 1,
    },
    bulletText: {
        fontSize: 23,
        textAlign: 'center',
        color: theme.colors.text,
        paddingLeft: 10,
        fontStyle: 'italic',
    },
    buttonContainer: {
        width: '50%',
        alignSelf: 'center',
        marginVertical: 10,
    },
    buttonBox: {
        marginVertical: 10,
        padding: 10,
        borderWidth: 1,
        backgroundColor: 'crimson',
      },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30,
        marginVertical: 10,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30,
        marginVertical: 10,
    },
});

export default MyFinder;
