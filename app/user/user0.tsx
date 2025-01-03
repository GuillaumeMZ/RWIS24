import React, { useState } from 'react';
import { Pressable, View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '../DataContext';

export default function User0() {
  const router = useRouter();
  const { addUserSelection } = useDataContext();  // Get the addUserSelection function from context
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSave = () => {
    // Validation check for name
    if (!name) {
      Alert.alert("Warning", "Please enter your name before proceeding.");
      return;
    }

    // Assuming you want to store the 'code' as an ingredient or something similar
    // and that the 'name' and 'additionalInfo' will be saved
    // Here, we call addUserSelection to save the user's data (this saves the info in userData)
    addUserSelection(name, code, 0, 0);  // You may want to update quantity and price based on your actual logic

    // Save the additional info to userData (if needed)
    const newUserData = { name, selectedIngredients: { code: { quantity: 0, price: 0 } } };
    // You can optionally add a specific handler to store additionalInfo if required

    // Navigate to the next page (user1)
    router.push('/user1');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter code"
        value={code}
        onChangeText={setCode}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Enter additional information"
        value={additionalInfo}
        onChangeText={setAdditionalInfo}
      />

      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save and Go to User1</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    height: 40,
    marginBottom: 15,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

