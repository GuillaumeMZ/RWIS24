import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

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
  const [isEditing, setIsEditing] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<{
    name: string;
    standardPortion: number;
    costPerPortion: number;
    unit: string;
  } | null>(null);

  const [newIngredient, setNewIngredient] = useState({
    name: "",
    standardPortion: "",
    costPerPortion: "",
    unit: "",
  });

  const handleAddIngredient = () => {
    if (
      !newIngredient.name.trim() ||
      !newIngredient.standardPortion ||
      !newIngredient.costPerPortion ||
      !newIngredient.unit.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    setIngredients((prev) => [
      ...prev,
      {
        name: newIngredient.name,
        standardPortion: parseFloat(newIngredient.standardPortion),
        costPerPortion: parseFloat(newIngredient.costPerPortion),
        unit: newIngredient.unit,
      },
    ]);

    setNewIngredient({ name: "", standardPortion: "", costPerPortion: "", unit: "" });
    setIsAdding(false);
  };

  const handleDeleteIngredient = (name:string) => {
    setIngredients((prev) => prev.filter((ingredient) => ingredient.name !== name));
  };

  const handleEditIngredient = () => {
    if (currentIngredient) {
      setIngredients((prev) =>
        prev.map((ingredient) =>
          ingredient.name === currentIngredient.name ? currentIngredient : ingredient
        )
      );
    }
    setIsEditing(false);
  };

  const openEditModal = (ingredient:any) => {
    setCurrentIngredient(ingredient);
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./ManagingBarbecue")}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <View style={styles.spaceBelowButton} />

      <Text style={styles.title}>Manage Ingredients</Text>

      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ingredientItem}
            onPress={() => openEditModal(item)}
          >
            <View style={styles.ingredientDetails}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientInfo}>
                Portion: {item.standardPortion} {item.unit} - {item.costPerPortion} yen
              </Text>
            </View>
            <TouchableOpacity onPress={() => handleDeleteIngredient(item.name)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setIsAdding(true)}>
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </TouchableOpacity>

      <Modal visible={isAdding || isEditing} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Edit Ingredient" : "Add Ingredient"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={isEditing && currentIngredient ? currentIngredient.name : newIngredient.name}
              onChangeText={(text) =>
                isEditing
                  ? setCurrentIngredient({ ...currentIngredient as any, name: text })
                  : setNewIngredient({ ...newIngredient, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Portion Size"
              keyboardType="numeric"
              value={
                isEditing
                  ? currentIngredient?.standardPortion.toString() || ""
                  : newIngredient.standardPortion
              }
              onChangeText={(text) =>
                isEditing
                  ? setCurrentIngredient({ ...currentIngredient, standardPortion: parseFloat(text) } as { name: string; standardPortion: number; costPerPortion: number; unit: string })
                  : setNewIngredient({ ...newIngredient, standardPortion: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Cost (in yen)"
              keyboardType="numeric"
              value={
                isEditing
                  ? currentIngredient?.costPerPortion.toString() || ""
                  : newIngredient.costPerPortion
              }
              onChangeText={(text) =>
                isEditing
                  ? setCurrentIngredient({ ...currentIngredient, costPerPortion: parseFloat(text) } as { name: string; standardPortion: number; costPerPortion: number; unit: string })
                  : setNewIngredient({ ...newIngredient, costPerPortion: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Unit (e.g., grams, bottles)"
              value={isEditing && currentIngredient ? currentIngredient.unit : newIngredient.unit}
              onChangeText={(text) =>
                isEditing
                  ? setCurrentIngredient({ ...currentIngredient, unit: text } as { name: string; standardPortion: number; costPerPortion: number; unit: string })
                  : setNewIngredient({ ...newIngredient, unit: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={isEditing ? handleEditIngredient : handleAddIngredient}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => (isEditing ? setIsEditing(false) : setIsAdding(false))}
            >
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
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FF7043",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
  },
  spaceBelowButton: {
    marginTop: 60, // Añade espacio debajo del botón
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7043",
    textAlign: "center",
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
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
    backgroundColor: "#F5F5F5",
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
