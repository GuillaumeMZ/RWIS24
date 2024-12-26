import React from 'react';
import { Pressable, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function User0() {
  const router = useRouter();
  const handleSubmit = () => {};

  return (
     <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
    <View style={styles.container}>
      <Text style={styles.title}>Join a Barbecue</Text>
      <TextInput style={styles.input} placeholder="Enter the Code" />
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.textArea} placeholder="Additional Information" multiline />
      <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/user/user1")}>
        <Text style={styles.buttonText}>Join</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  returnToMenuButton: {
    backgroundColor: 'red',
  },
  returnToMenuButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,

    marginLeft: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
    justifyContent: 'center',
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
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: 300,
  },
  textArea: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    height: 100,
    width: 300,
    borderRadius: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    color: 'white',
    marginLeft: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: 150,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 12,
  },
  displayBox: {
    backgroundColor: 'white',
    width: '100%',
    height: 200,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 10,
  },

});

