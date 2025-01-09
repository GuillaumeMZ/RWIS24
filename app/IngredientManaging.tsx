import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function IngredientManaging() {
  const router = useRouter();

  const [ingredients, setIngredients] = useState([
    { name: "Beef", standardPortion: 300, costPerPortion: 1500, unit: "grams" },
    { name: "Chicken", standardPortion: 300, costPerPortion: 800, unit: "grams" },
    { name: "Sausages", standardPortion: 200, costPerPortion: 600, unit: "grams" },
    { name: "Beer", standardPortion: 3, costPerPortion: 500, unit: "cans" },
    { name: "Soft Drinks", standardPortion: 3, costPerPortion: 300, unit: "cans" },
    { name: "Vegetables", standardPortion: 50, costPerPortion: 700, unit: "grams" },
    { name: "Bread", standardPortion: 2, costPerPortion: 200, unit: "units" },
    { name: "Sauces", standardPortion: 0.5, costPerPortion: 400, unit: "bottles" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newIngredient, setNewIngredient] = useState({
    name: "",
    standardPortion: "",
    costPerPortion: "",
    unit: "",
  });

  // Agregar un nuevo ingrediente
  const handleAddIngredient = () => {
    if (
      newIngredient.name.trim() === "" ||
      newIngredient.standardPortion === "" ||
      newIngredient.costPerPortion === "" ||
      newIngredient.unit.trim() === ""
    ) {
      alert("Please fill in all fields");
      return;
    }

    setIngredients([
      ...ingredients,
      {
        name: newIngredient.name,
        standardPortion: parseFloat(newIngredient.standardPortion),
        costPerPortion: parseFloat(newIngredient.costPerPortion),
        unit: newIngredient.unit,
      },
    ]);

    setNewIngredient({ name: "", standardPortion: "", costPerPortion: "", unit: "" });
    setIsAdding(false); // Cierra la ventana después de añadir
  };

  // Eliminar un ingrediente
  const handleDeleteIngredient = (name) => {
    setIngredients(ingredients.filter((ingredient) => ingredient.name !== name));
  };

  return (
    <View style={styles.container}>
      {/* Botón de vuelta */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("./ManagingBarbecue")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Manage Ingredients</Text>

      {/* Lista de ingredientes */}
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <View style={styles.ingredientDetails}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientInfo}>
                Portion: {item.standardPortion} {item.unit} - {item.costPerPortion} yen
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteIngredient(item.name)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Botón para abrir ventana de añadir ingrediente */}
      <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      {/* Ventana de añadir ingrediente */}
      <Modal visible={isAdding} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={newIngredient.name}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Portion Size"
              keyboardType="numeric"
              value={newIngredient.standardPortion}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, standardPortion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Cost (in yen)"
              keyboardType="numeric"
              value={newIngredient.costPerPortion}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, costPerPortion: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Unit (e.g., grams, cans)"
              value={newIngredient.unit}
              onChangeText={(text) => setNewIngredient({ ...newIngredient, unit: text })}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleAddIngredient}>
              <Text style={styles.saveButtonText}>Save</Text>
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
    backgroundColor: "#FFF4E5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7043",
    textAlign: "center",
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FF7043",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  ingredientItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#FF7043",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  ingredientDetails: {
    flex: 1,
    marginRight: 10,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF7043",
  },
  ingredientInfo: {
    fontSize: 14,
    color: "#555",
  },
  addButton: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFF",
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
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderColor: "#FF7043",
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF7043",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});
