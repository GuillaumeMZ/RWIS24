import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function IngredientList() {
  const router = useRouter();

  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Beef Skewers", unit: "grams", portionSize: 300, selected: 0 },
    { id: 2, name: "Chicken Skewers", unit: "grams", portionSize: 300, selected: 0 },
    { id: 3, name: "Sausages", unit: "grams", portionSize: 200, selected: 0 },
    { id: 4, name: "Beer", unit: "cans", portionSize: 3, selected: 0 },
    { id: 5, name: "Soft Drinks", unit: "cans", portionSize: 3, selected: 0 },
    { id: 6, name: "Vegetables", unit: "grams", portionSize: 50, selected: 0 },
    { id: 7, name: "Bread", unit: "units", portionSize: 2, selected: 0 },
    { id: 8, name: "Sauces", unit: "bottles", portionSize: 0.5, selected: 0 }
  ]);

  const handleInputChange = (value, id) => {
    const numericValue = parseFloat(value) || 0; // Convertir a número y manejar valores vacíos
    setIngredients((prev) =>
      prev.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, selected: numericValue } : ingredient
      )
    );
  };

  const handleReady = () => {
    console.log("Selected Ingredients:", ingredients);
    router.push("/UserFinal");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ingredient Selection for John</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text style={styles.ingredientName}>{item.name}</Text>
            <Text style={styles.ingredientDetails}>
              Portion Size: {item.portionSize} {item.unit}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter multiplier (0 - 5)`}
              keyboardType="numeric"
              value={item.selected.toString()}
              onChangeText={(value) => handleInputChange(value, item.id)}
            />
            <Text style={styles.selectedValue}>
              Total: {item.selected * item.portionSize} {item.unit}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
        <Text style={styles.readyButtonText}>Ready</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
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
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  ingredientDetails: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  selectedValue: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  readyButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  readyButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
