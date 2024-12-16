import React from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image, StatusBar } from "react-native";
import { useRouter, Stack } from 'expo-router';

export default function Index() {
  const router = useRouter();

  const handleSubmit = () => {};


  return (
    <View style={styles.container}>
      
      <Image
        source={require("../images/bbq_clip_art.png")}
        style={styles.image}
      />

      <Text style={styles.welcomeText}>Welcome, Barbecuer!</Text>

      <View>
        <TouchableOpacity style={styles.button} onPress={() => router.push("admin/admin0")}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => router.push("/user/user0")}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red", // Red background
  },
  image: {
    width: 200, // Adjust the width to fit your design
    height: 200, // Adjust the height to fit your design
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    backgroundColor: "white",
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: "transparent",
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "grey",
    borderRadius: 5,
    margin: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

