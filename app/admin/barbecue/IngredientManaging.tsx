import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBarbecueContext } from "../../../context/BarbecueContext";

export default function IngredientManaging() {
  const router = useRouter();
  const { barbecues, addIngredient, editIngredient, deleteIngredient } =
    useBarbecueContext();
  const selectedBarbecue = barbecues.find((barbecue) => barbecue.selected);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState(null);

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

    addIngredient({
      name: newIngredient.name,
      standardPortion: parseFloat(newIngredient.standardPortion),
      costPerPortion: parseFloat(newIngredient.costPerPortion),
      unit: newIngredient.unit,
    });

    setNewIngredient({
      name: "",
      standardPortion: "",
      costPerPortion: "",
      unit: "",
    });
    setIsAdding(false);
  };

  const handleEditIngredient = () => {
    if (currentIngredient) {
      editIngredient(currentIngredient.name, currentIngredient);
    }
    setIsEditing(false);
  };

  const handleDeleteIngredient = (name: string) => {
    deleteIngredient(name);
  };

  if (!selectedBarbecue) {
    return (
      <View style={styles.container}>
        <Text>No barbecue selected.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./ManagingBarbecue")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Manage Ingredients</Text>

      <FlatList
        data={selectedBarbecue.ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            <View>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <Text style={styles.ingredientInfo}>
                Portion: {item.standardPortion} {item.unit} - Cost:{" "}
                {item.costPerPortion} yen
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteIngredient(item.name)}
            >
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsAdding(true)}
      >
        <Text style={styles.addButtonText}>+ Add Ingredient</Text>
      </TouchableOpacity>

      <Modal visible={isAdding} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Ingredient</Text>
            <TextInput
              style={styles.input}
              placeholder="Ingredient Name"
              value={newIngredient.name}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, name: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Portion Size"
              keyboardType="numeric"
              value={newIngredient.standardPortion}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, standardPortion: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Cost Per Portion"
              keyboardType="numeric"
              value={newIngredient.costPerPortion}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, costPerPortion: text })
              }
            />
            <TextInput
              style={styles.input}
              placeholder="Unit"
              value={newIngredient.unit}
              onChangeText={(text) =>
                setNewIngredient({ ...newIngredient, unit: text })
              }
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddIngredient}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsAdding(false)}
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
    backgroundColor: "#FF7043",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 20,
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
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
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
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
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
    backgroundColor: "#FFFFFF",
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
    color: "#FFFFFF",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#FF7043",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

