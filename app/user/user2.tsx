import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function User2() {
  const router = useRouter();

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
    <View style={styles.container}>
      <View style={styles.displayBox}>
        <Text style={styles.header}>What You Need to Pay</Text>
      </View>
      <TouchableOpacity style={styles.button}>
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
    backgroundColor: 'red',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  displayBox: {
    width: '70%',
    height: 300,
    borderWidth: 5,
    borderColor: 'grey',
    backgroundColor: 'white',
    borderRadius: 20,

    justifyContent: 'center',
    alignItems: 'left',
    paddingLeft: 30,
  },
  header: {
    fontSize: 18,
    color: 'black',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    marginTop: 20,
    borderRadius: 20,
    width: 150,

    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    paddingHorizontal: 20,
  },
});
