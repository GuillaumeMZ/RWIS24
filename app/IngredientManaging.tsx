import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Modal } from "react-native";

export default function IngredientManaging() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Beef", portionSize: "300 grams", unit: "grams", price: 1500 },
    { id: 2, name: "Chicken", portionSize: "300 grams", unit: "grams", price: 800 },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    portionSize: "",
    unit: "",
    price: "",
  });

  const addIngredient = () => {
    setIngredients([
      ...ingredients,
      { id: ingredients.length + 1, ...newIngredient, price: parseFloat(newIngredient.price) },
    ]);
    setNewIngredient({ name: "", portionSize: "", unit: "", price: "" });
    setIsAdding(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Ingredients</Text>
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <Text style={styles.ingredientText}>{item.name}</Text>
            <Text style={styles.ingredientSubText}>
              Portion: {item.portionSize} ({item.unit})
            </Text>
            <Text style={styles.ingredientSubText}>Price: {item.price} yen</Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </TouchableOpacity>

      <Modal visible={isAdding} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={newIngredient.name}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Portion Size (e.g., 300 grams)"
              value={newIngredient.portionSize}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, portionSize: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Unit (e.g., grams, bottles)"
              value={newIngredient.unit}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, unit: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Price (in yen)"
              keyboardType="numeric"
              value={newIngredient.price}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, price: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={addIngredient}>
              <Text style={styles.saveButtonText}>Save Ingredient</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsAdding(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  ingredientText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  ingredientSubText: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#ff7043",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
