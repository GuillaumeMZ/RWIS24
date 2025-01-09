import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AdminBase() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  // Lista inicial de barbacoas
  const [barbecues, setBarbecues] = useState([
    { id: 1, name: "Summer BBQ Party", date: "2025-01-15", description: "A fun summer barbecue with friends!" },
    { id: 2, name: "John's Birthday Bash", date: "2025-02-05", description: "Celebrating John's big day with BBQ and drinks!" },
    { id: 3, name: "Family Reunion", date: "2025-03-10", description: "Gathering the family for a delicious barbecue." },
  ]);

  const [newBarbecue, setNewBarbecue] = useState({
    name: "",
    date: "",
    description: "",
    accessCode: "",
  });

  // Crear nueva barbacoa
  const handleCreateBarbecue = () => {
    if (!newBarbecue.name || !newBarbecue.date || !newBarbecue.accessCode) {
      alert("Please fill in all fields");
      return;
    }

    const newId = barbecues.length > 0 ? barbecues[barbecues.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...newBarbecue };
    setBarbecues([...barbecues, newEntry]);
    setNewBarbecue({ name: "", date: "", description: "", accessCode: "" });
    setIsCreating(false);
  };

  // Eliminar barbacoa
  const handleDeleteBarbecue = (id) => {
    setBarbecues(barbecues.filter((barbecue) => barbecue.id !== id));
  };

  return (
    <View style={styles.container}>
      {/* Botón de vuelta atrás */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("./")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Your Barbecues</Text>

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

      {/* Formulario para crear barbacoa */}
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
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsCreating(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Botón para abrir el formulario */}
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
