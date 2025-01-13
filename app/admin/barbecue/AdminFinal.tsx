import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBarbecueContext } from "../../../context/BarbecueContext";

export default function AdminBase() {
  const router = useRouter();
  const { barbecues, addBarbecue, deleteBarbecue, selectBarbecue } = useBarbecueContext();
  const [isCreating, setIsCreating] = useState(false);

  const [newBarbecue, setNewBarbecue] = useState({
    name: "",
    date: "",
    description: "",
    accessCode: "",
  });

  const handleCreateBarbecue = () => {
    if (!newBarbecue.name || !newBarbecue.date || !newBarbecue.accessCode) {
      alert("Please fill in all fields");
      return;
    }
    addBarbecue(newBarbecue);
    setNewBarbecue({ name: "", date: "", description: "", accessCode: "" });
    setIsCreating(false);
  };

  const handleNavigateToBarbecue = (barbecue) => {
    selectBarbecue(barbecue.id);
    router.push("./barbecue/ManagingBarbecue");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Barbecues</Text>

      <FlatList
        data={barbecues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.barbecueItem}>
            <TouchableOpacity
              style={styles.barbecueContent}
              onPress={() => handleNavigateToBarbecue(item)}
            >
              <Text style={styles.barbecueText}>{item.name}</Text>
              <Text style={styles.barbecueDetails}>Date: {item.date}</Text>
              <Text style={styles.barbecueDetails}>{item.description}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteBarbecue(item.id)}>
              <Ionicons name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      {isCreating && (
        <View style={styles.createContainer}>
          <TextInput
            style={styles.input}
            placeholder="Barbecue Name"
            value={newBarbecue.name}
            onChangeText={(text) => setNewBarbecue({ ...newBarbecue, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            value={newBarbecue.date}
            onChangeText={(text) => setNewBarbecue({ ...newBarbecue, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={newBarbecue.description}
            onChangeText={(text) => setNewBarbecue({ ...newBarbecue, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Access Code"
            value={newBarbecue.accessCode}
            onChangeText={(text) => setNewBarbecue({ ...newBarbecue, accessCode: text })}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.createButton} onPress={handleCreateBarbecue}>
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsCreating(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isCreating && (
        <TouchableOpacity style={styles.addButton} onPress={() => setIsCreating(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    backgroundColor: "orange",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
    width: 70,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  barbecueItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barbecueContent: {
    flex: 1,
  },
  barbecueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  barbecueDetails: {
    fontSize: 14,
    color: "#555",
  },
  createContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createButton: {
    flex: 2,
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#ff7043",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 24,
  },
});

