import React from 'react';
import { Pressable, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Admin0() {
  const router = useRouter();
  const handleSubmit = () => {};

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>Create a Barbecue</Text>
        <TextInput style={styles.input} placeholder="Barbecue Name" />
        <TextInput style={styles.input} placeholder="Location" />
        <TextInput style={styles.input} placeholder="Date" />
        <TextInput style={styles.textArea} placeholder="Description" multiline />
        <TouchableOpacity style={styles.button} onPress={() => router.push("/screens/admin/admin1")}>
          <Text style={styles.buttonText}>Save</Text>
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
 button: {
    backgroundColor: 'grey',
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    borderRadius:25,
  },

});

