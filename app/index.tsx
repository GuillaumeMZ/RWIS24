import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Index() {
  const router = useRouter();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [name, setName] = useState("");

  const handleNameSubmit = () => {
    if (name.trim() === "") {
      alert("Please enter your name.");
      return;
    }
    setIsMenuVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Imagen de bienvenida */}
      <Image
        source={require("./images/bbq_clip_art.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to BBQer!</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./AdminBase")}
      >
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./UserBase")}
      >
        <Text style={styles.buttonText}>User</Text>
      </TouchableOpacity>

      {/* Botón de usuario */}
      <TouchableOpacity
        style={styles.userButton}
        onPress={() => setIsMenuVisible(true)}
      >
        <Ionicons name="person-outline" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Modal para introducir el nombre */}
      <Modal
        visible={isMenuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Type your name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleNameSubmit}
            >
              <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsMenuVisible(false)}
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#ff7043",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    width: "80%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  userButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#ff7043",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 1, height: 2 },
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f0f0f0",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  acceptButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  acceptButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ff7043",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    width: "100%",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
