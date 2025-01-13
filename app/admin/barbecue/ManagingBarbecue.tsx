import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function ManagingBarbecue() {
  const router = useRouter();
  const params = useLocalSearchParams(); // Retrieve parameters from the route.

  const { id, name, date, description } = params || {}; // Safely destructure parameters.

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./../AdminBase")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Barbecue title */}
      <Text style={styles.title}>{"Barbecue Management"}</Text>

      {/* Navigation buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "./IngredientManaging",
            params: { id },
          })
        }
      >
        <Text style={styles.buttonText}>Manage Ingredients</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          router.push({
            pathname: "./UserManage",
            params: { id },
          })
        }
      >
        <Text style={styles.buttonText}>Manage Guests</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF4E5", // Light orange background
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FF7043", // Dark orange
    marginTop: 60,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFA726", // Intense orange
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
    shadowColor: "#FF7043", // Orange shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FF7043", // Dark orange back button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 4,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

