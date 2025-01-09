import React, { useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useRouter } from "expo-router";

export default function UserBase() {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  const barbecues = [
    { id: 1, name: "Baby Shower of Hanna" },
    { id: 2, name: "Birthday of Vanessa" },
    { id: 3, name: "Summer BBQ Party" },
  ];

  const handleJoinBarbecue = () => {
    setIsJoining(false);
    if (accessCode) {
      router.push("./IngredientList");
    } else {
      alert("Please enter a valid access code.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Barbecues</Text>
      <FlatList
        data={barbecues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.barbecueItem}
            onPress={() => router.push("./IngredientList")}
          >
            <Text style={styles.barbecueText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.joinButton} onPress={() => setIsJoining(true)}>
        <Text style={styles.joinButtonText}>Join a Barbecue</Text>
      </TouchableOpacity>

      <Modal visible={isJoining} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Access Code</Text>
            <TextInput
              style={styles.input}
              placeholder="Access Code"
              value={accessCode}
              onChangeText={setAccessCode}
            />
            <TouchableOpacity style={styles.confirmButton} onPress={handleJoinBarbecue}>
              <Text style={styles.confirmButtonText}>Join</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setIsJoining(false)}>
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
  barbecueItem: {
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
  barbecueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  joinButton: {
    backgroundColor: "#007bff",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  joinButtonText: {
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
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  confirmButtonText: {
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
