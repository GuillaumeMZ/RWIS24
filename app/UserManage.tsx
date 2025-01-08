import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UserManage() {
  const router = useRouter();

  // Lista de invitados con sus ítems asignados
  const guests = [
    { id: 1, name: "John", items: ["900 grams of Beef (4500 yen)"] },
    { id: 2, name: "Mary", items: ["900 grams of Beef (4500 yen)"] },
    { id: 3, name: "Peter", items: ["900 grams of Beef (4500 yen)"] },
    { id: 4, name: "Anna", items: ["900 grams of Beef (4500 yen)"] },
    { id: 5, name: "Sophia", items: ["1650 grams of Chicken (4400 yen)"] },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Guests</Text>
      <FlatList
        data={guests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.guestItem}>
            <Text style={styles.guestName}>{item.name}</Text>
            <FlatList
              data={item.items}
              keyExtractor={(subItem, index) => index.toString()}
              renderItem={({ item: subItem }) => (
                <Text style={styles.guestItemText}>- {subItem}</Text>
              )}
            />
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("/ManagingBarbecue")}
      >
        <Text style={styles.backButtonText}>Back to Barbecue Management</Text>
      </TouchableOpacity>
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
  guestItem: {
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
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  guestItemText: {
    fontSize: 14,
    color: "#555",
  },
  backButton: {
    backgroundColor: "#ff7043",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
