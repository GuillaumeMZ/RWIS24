import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function UserFinal() {
  const router = useRouter();

  // Datos para mostrar lo que el usuario debe llevar
  const userSummary = {
    name: "John",
    totalCost: 4500,
    items: [
      { id: 1, name: "Beef", quantity: "900 grams", cost: "4500 yen" },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Botón de vuelta arriba */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/IngredientList")}
      >
        <Text style={styles.backButtonText}>Back to Ingredient Selection</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>
        {userSummary.name}, your total cost will be:
      </Text>
      <Text style={styles.totalCost}>{userSummary.totalCost} yen</Text>
      <Text style={styles.subtitle}>And you have to bring:</Text>

      {/* Lista de elementos */}
      <FlatList
        data={userSummary.items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>
              - {item.quantity} of {item.name} ({item.cost})
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "flex-start",
  },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#ff7043", // Color naranja
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  totalCost: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemName: {
    fontSize: 16,
    color: "#333",
  },
});
