import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AdminBase() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  // Lista inicial de barbacoas con título, fecha y descripción
  const [barbecues, setBarbecues] = useState([
    { id: 1, name: "Summer BBQ Party", date: "2025-01-15", description: "A fun summer barbecue with friends!" },
    { id: 2, name: "John's Birthday Bash", date: "2025-02-05", description: "Celebrating John's big day with BBQ and drinks!" },
    { id: 3, name: "Family Reunion", date: "2025-03-10", description: "Gathering the family for a delicious barbecue." },
  ]);

  const [newBarbecue, setNewBarbecue] = useState({
    name: "",
    date: "",
    description: "",
  });

  // Manejar la creación de una nueva barbacoa
  const handleCreateBarbecue = () => {
    if (newBarbecue.name.trim() === "" || newBarbecue.date.trim() === "") {
      alert("Please fill in all fields");
      return;
    }

    const newId = barbecues.length > 0 ? barbecues[barbecues.length - 1].id + 1 : 1;
    const newEntry = {
      id: newId,
      ...newBarbecue,
    };

    setBarbecues([...barbecues, newEntry]);
    setNewBarbecue({ name: "", date: "", description: "" });
    setIsCreating(false);
  };

  // Manejar la eliminación de una barbacoa
  const handleDeleteBarbecue = (id: any) => {
    setBarbecues(barbecues.filter((barbecue) => barbecue.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Header con título y botón de vuelta */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("./")}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Barbecues</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsCreating(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de barbacoas */}
      <FlatList
        data={barbecues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.barbecueItem}>
            <View style={styles.barbecueDetailsContainer}>
              <TouchableOpacity
                style={styles.barbecueContent}
                onPress={() => router.push("./ManagingBarbecue")}
              >
                <Text style={styles.barbecueText}>{item.name}</Text>
                <Text style={styles.barbecueDetails}>Date: {item.date}</Text>
                <Text style={styles.barbecueDetails}>{item.description}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDeleteBarbecue(item.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      {/* Formulario para agregar nueva barbacoa */}
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
          <TouchableOpacity style={styles.createButton} onPress={handleCreateBarbecue}>
            <Text style={styles.createButtonText}>Create</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
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
  barbecueItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barbecueDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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
  createButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  createButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
