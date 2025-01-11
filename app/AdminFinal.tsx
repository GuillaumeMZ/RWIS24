import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function UserFinal() {
  const router = useRouter();

  const totalIngredients = [
    { id: 1, name: "Beef", quantity: "4500 grams", price: "9000 yen" },
    { id: 2, name: "Chicken", quantity: "3600 grams", price: "5500 yen" },
    { id: 3, name: "Sausages", quantity: "2400 grams", price: "3200 yen" },
    { id: 4, name: "Beer", quantity: "36 cans", price: "4000 yen" },
    { id: 5, name: "Soft Drinks", quantity: "36 cans", price: "3600 yen" },
    { id: 6, name: "Vegetables", quantity: "700 grams", price: "1000 yen" },
    { id: 7, name: "Bread", quantity: "14 slices", price: "500 yen" },
    { id: 8, name: "Sauces", quantity: "7.5 bottles", price: "2000 yen" },
  ];

  const guests = [
    { id: 1, name: "John" },
    { id: 2, name: "Mary" },
    { id: 3, name: "Peter" },
    { id: 4, name: "Anna" },
    { id: 5, name: "Louis" },
    { id: 6, name: "Sophia" },
    { id: 7, name: "Charles" },
    { id: 8, name: "Laura" },
    { id: 9, name: "James" },
    { id: 10, name: "Clara" },
    { id: 11, name: "Daniel" },
    { id: 12, name: "Helen" },
    { id: 13, name: "Michael" },
    { id: 14, name: "Paula" },
    { id: 15, name: "Andrew" },
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
      <View style={styles.guestList}>
        {guests.map((guest, index) => (
          <View style={styles.guestColumn} key={index}>
            <Text style={styles.guestText}>{guest.name}</Text>
          </View>
        ))}
      </View>

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
  guestList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  guestColumn: {
    width: "45%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  guestText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    fontWeight: "bold",
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
