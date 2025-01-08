import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ManagingBarbecue() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Barbecue Management</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./IngredientManaging")}
      >
        <Text style={styles.buttonText}>Manage Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./UserManage")}
      >
        <Text style={styles.buttonText}>Manage Guests</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./AdminFinal")}
      >
        <Text style={styles.buttonText}>Launch Barbecue</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./AdminBase")}
      >
        <Text style={styles.backButtonText}>Back to Barbecues</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#ff7043",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
