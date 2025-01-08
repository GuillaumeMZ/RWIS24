import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function DevMenu() {
  const router = useRouter();

  // Lista de todas las pantallas
  const screens = [
    { name: "Home (Index)", route: "/Index" },
    { name: "Admin Base", route: "/AdminBase" },
    { name: "Managing Barbecue", route: "/ManagingBarbecue" },
    { name: "Ingredient Managing", route: "/IngredientManaging" },
    { name: "User Manage", route: "/UserManage" },
    { name: "Admin Final", route: "/AdminFinal" },
    { name: "User Base", route: "/UserBase" },
    { name: "Ingredient List", route: "/IngredientList" },
    { name: "User Final", route: "/UserFinal" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Developer Menu</Text>
      {screens.map((screen, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => router.push(screen.route)}
        >
          <Text style={styles.buttonText}>{screen.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
});
