import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function UserFinal() {
  const router = useRouter();

  const totalIngredients = [
    { id: 1, name: "Beef", quantity: "4500 grams", price: "22500 yen" },
    { id: 2, name: "Chicken", quantity: "3600 grams", price: "9600 yen" },
    { id: 3, name: "Sausages", quantity: "2400 grams", price: "7200 yen" },
    { id: 4, name: "Beer", quantity: "36 cans", price: "6000 yen" },
    { id: 5, name: "Soft Drinks", quantity: "36 cans", price: "3600 yen" },
    { id: 6, name: "Vegetables", quantity: "700 grams", price: "9800 yen" },
    { id: 7, name: "Bread", quantity: "14 units", price: "2800 yen" },
    { id: 8, name: "Sauces", quantity: "7.5 bottles", price: "6000 yen" },
  ];

  const guests = [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Peter" },
    { id: 4, name: "Anna" },
    { id: 5, name: "Sophia" },
    { id: 6, name: "Charles" },
    { id: 7, name: "Laura" },
    { id: 8, name: "James" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Final Summary</Text>
      <Text style={styles.sectionTitle}>Total Ingredients Needed:</Text>
      <FlatList
        data={totalIngredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{item.name}</Text>
            <Text style={styles.ingredientSubText}>
              Quantity: {item.quantity} - Cost: {item.price}
            </Text>
          </View>
        )}
      />

      <Text style={styles.sectionTitle}>Guests Attending:</Text>
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.guestText}>- {item.name}</Text>
        )}
      />

      {/* Botón de vuelta a UserBase */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./")}
      >
        <Text style={styles.buttonText}>Back to BBQ Menu</Text>
      </TouchableOpacity>

      {/* Botón de vuelta a IngredientList */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./IngredientManaging")}
      >
        <Text style={styles.buttonText}>Back to Ingredient Management</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  ingredientItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ingredientText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientSubText: {
    fontSize: 14,
    color: "#555",
  },
  guestText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#ff7043",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
