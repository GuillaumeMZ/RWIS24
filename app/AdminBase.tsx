import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";

export default function AdminBase() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const barbecues = [
    { id: 1, name: "Barbecue 1" },
    { id: 2, name: "Barbecue 2" },
    { id: 3, name: "Barbecue 3" },
  ];

  const [newBarbecue, setNewBarbecue] = useState({
    name: "",
    date: "",
    description: "",
  });

  const handleCreateBarbecue = () => {
    setIsCreating(false);
    router.push("./ManagingBarbecue");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Barbecues</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setIsCreating(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={barbecues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.barbecueItem}
            onPress={() => router.push("./ManagingBarbecue")}
          >
            <Text style={styles.barbecueText}>{item.name}</Text>
          </TouchableOpacity>
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
  },
  barbecueText: {
    fontSize: 16,
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
