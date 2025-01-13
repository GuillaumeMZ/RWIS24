import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useBarbecueContext } from "../../../context/BarbecueContext";

export default function UserManage() {
  const router = useRouter();
  const { barbecues, deleteUserFromBarbecue, updateUserQuantities } =
    useBarbecueContext();
  const selectedBarbecue = barbecues.find((barbecue) => barbecue.selected);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedQuantities, setEditedQuantities] = useState([]);

  const handleDeleteUser = (userName) => {
    Alert.alert(
      "Delete User",
      `Are you sure you want to delete ${userName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteUserFromBarbecue(selectedBarbecue.id, userName);
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditedQuantities(
      user.quantities?.map((item) => ({
        ...item,
        portions: item.portions || 1,
      })) || []
    );
    setIsModalVisible(true);
  };

  const handleQuantityChange = (id, newPortions) => {
    setEditedQuantities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, portions: Math.max(newPortions, 0) } : item
      )
    );
  };

  const handleSaveChanges = () => {
    updateUserQuantities(
      selectedBarbecue.id,
      selectedUser.name,
      editedQuantities
    );
    setIsModalVisible(false);
  };

  if (!selectedBarbecue) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No barbecue selected!</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./ManagingBarbecue")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Guests for {selectedBarbecue.name}</Text>
      <View style={styles.userList}>
        {selectedBarbecue.users.map((user, index) => (
          <View key={index} style={styles.userItem}>
            <Text style={styles.userName}>{user.name}</Text>
            <View style={styles.userActions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleEditUser(user)}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(user.name)}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal for editing user quantities */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Edit Quantities for {selectedUser?.name}
            </Text>

            {editedQuantities.map((item) => (
              <View key={item.id} style={styles.quantityItem}>
                <Text style={styles.quantityName}>{item.name}</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() =>
                      handleQuantityChange(item.id, item.portions - 1)
                    }
                  >
                    <Text style={styles.adjustButtonText}>-</Text>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    keyboardType="numeric"
                    value={item.portions.toString()}
                    onChangeText={(text) =>
                      handleQuantityChange(item.id, parseInt(text) || 0)
                    }
                  />
                  <TouchableOpacity
                    style={styles.adjustButton}
                    onPress={() =>
                      handleQuantityChange(item.id, item.portions + 1)
                    }
                  >
                    <Text style={styles.adjustButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF4E5",
  },
  backButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    textAlign: "center",
    marginBottom: 20,
  },
  userList: {
    marginTop: 20,
  },
  userItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green for edit
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginRight: 10,
  },
  editButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "#FFF",
    fontSize: 14,
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
  quantityItem: {
    marginBottom: 15,
  },
  quantityName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  adjustButton: {
    backgroundColor: "#FFA726",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  adjustButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityInput: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FF7043",
    textAlign: "center",
    width: 60,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    flex: 1,
  },
  cancelButtonText: {
    color: "#FFF",
    fontSize: 16,
  },
});

