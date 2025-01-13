import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useBarbecueContext } from "../../context/BarbecueContext";

export default function UserBase() {
  const router = useRouter();
  const { barbecues, addUserToBarbecue, selectBarbecue } = useBarbecueContext();
  const [selectedBarbecue, setSelectedBarbecue] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userName, setUserName] = useState("");
  const [accessCode, setAccessCode] = useState("");

  const handleSelectBarbecue = (barbecue) => {
    setSelectedBarbecue(barbecue);
    setIsModalVisible(true);
    setAccessCode("");
    setUserName("");
  };

  const handleSubmit = () => {
    if (selectedBarbecue && selectedBarbecue.accessCode === accessCode) {
      const existingUser = selectedBarbecue.users.find(
        (user) => user.name === userName
      );

      if (!existingUser) {
        // Add the new user if they don't exist
        addUserToBarbecue(selectedBarbecue.id, { name: userName });
      }

      // Mark the barbecue as selected
      selectBarbecue(selectedBarbecue.id);

      Alert.alert("Access Granted", `Welcome, ${userName}!`);
      setIsModalVisible(false);
      setUserName("");
      setAccessCode("");

      // Navigate to IngredientList.tsx
      router.push({
        pathname: "./IngredientList",
        params: { userName },
      });
    } else {
      Alert.alert("Access Denied", "Invalid Access Code. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Available Barbecues</Text>
      <FlatList
        data={barbecues}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.barbecueItem}
            onPress={() => handleSelectBarbecue(item)}
          >
            <Text style={styles.barbecueText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={userName}
              onChangeText={(text) => setUserName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Access Code"
              value={accessCode}
              onChangeText={(text) => setAccessCode(text)}
              secureTextEntry
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => {
                  setIsModalVisible(false);
                  setSelectedBarbecue(null);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
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
    textAlign: "center",
  },
  barbecueItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  barbecueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#4caf50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginRight: 10,
  },
  submitButtonText: {
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
});

