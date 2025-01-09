import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ManagingBarbecue() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("./AdminBase")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF4E5", // Fondo naranja claro
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#FF7043", // Naranja oscuro
    marginTop: 60,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#FFA726", // Naranja más intenso
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
    shadowColor: "#FF7043", // Sombra naranja
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
    backgroundColor: "#FF7043", // Botón de vuelta en naranja oscuro
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
