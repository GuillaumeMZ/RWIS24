import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function UserManagement() {
  const router = useRouter();

  const [guestData, setGuestData] = useState([
    { name: "John", portions: [1, 0.5, 1, 1, 1, 1.5, 0, 1] },
    { name: "Mary", portions: [1, 1, 0, 0.5, 1, 1, 1, 1] },
    { name: "Peter", portions: [2, 0, 1.5, 1, 0, 0.5, 1, 1] },
    { name: "Anna", portions: [1, 1.5, 0, 1, 1, 0.5, 0, 1] },
    { name: "Louis", portions: [0, 1, 1, 0.5, 1, 1.5, 0, 1] },
    { name: "Sophia", portions: [1, 1, 0.5, 1, 0, 1, 1, 1] },
    { name: "Charles", portions: [1.5, 0, 1, 1, 1, 0.5, 0, 1] },
    { name: "Laura", portions: [0, 1, 1.5, 0.5, 1, 1, 1, 1] },
    { name: "James", portions: [1, 1, 0, 1, 1, 1.5, 0, 0.1] },
    { name: "Clara", portions: [1, 0.5, 1, 0, 1, 1, 1, 1] },
    { name: "Daniel", portions: [1.5, 1, 0, 1, 1, 1, 0, 1] },
    { name: "Helen", portions: [1, 1.5, 1, 0.5, 1, 0, 1, 1] },
    { name: "Michael", portions: [1, 1, 0.5, 1, 0, 1, 0, 1] },
    { name: "Paula", portions: [0.5, 1, 1, 1, 1, 1.5, 0, 1] },
    { name: "Andrew", portions: [1, 0, 1.5, 1, 1, 0.5, 1, 1] },
  ]);

  const columns = [
    { name: "Beef Skewers", portionSize: 300, unit: "grams", costPerPortion: 500 },
    { name: "Chicken Skewers", portionSize: 300, unit: "grams", costPerPortion: 800 },
    { name: "Sausages", portionSize: 200, unit: "grams", costPerPortion: 600 },
    { name: "Beer", portionSize: 2, unit: "cans", costPerPortion: 500 },
    { name: "Soft Drinks", portionSize: 2, unit: "cans", costPerPortion: 300 },
    { name: "Vegetables", portionSize: 50, unit: "grams", costPerPortion: 700 },
    { name: "Bread", portionSize: 2, unit: "units", costPerPortion: 200 },
    { name: "Sauces", portionSize: 0.5, unit: "bottles", costPerPortion: 400 },
  ];

  const adjustPortion = (guestIndex, portionIndex, adjustment) => {
    const updatedGuests = [...guestData];
    updatedGuests[guestIndex].portions[portionIndex] = Math.max(
      updatedGuests[guestIndex].portions[portionIndex] + adjustment,
      0
    );
    setGuestData(updatedGuests);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de vuelta */}
      <View style={styles.backButtonContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("./ManagingBarbecue")}
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
      </View>

      {/* Separador */}
      <View style={styles.separator} />

      <Text style={styles.title}>Guest Portion Management</Text>

      {/* Tabla de ingredientes */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Ingredient</Text>
          <Text style={styles.headerCell}>Cost per portion</Text>
          <Text style={styles.headerCell}>Portion Size</Text>
          <Text style={styles.headerCell}>Unit</Text>
        </View>
        {columns.map((col, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.cell, { flex: 2 }]}>{col.name}</Text>
            <Text style={styles.cell}>{col.costPerPortion}</Text>
            <Text style={styles.cell}>{col.portionSize}</Text>
            <Text style={styles.cell}>{col.unit}</Text>
          </View>
        ))}
      </View>

      {/* Tabla de raciones de los invitados */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.headerCell, { flex: 2 }]}>Guest</Text>
          {columns.map((col, index) => (
            <Text key={index} style={styles.headerCell}>
              {col.name}
            </Text>
          ))}
        </View>
        {guestData.map((guest, guestIndex) => (
          <View key={guestIndex} style={styles.tableRow}>
            <Text
              style={[
                styles.cell,
                {
                  flex: 2,
                  backgroundColor: "#FF7043",
                  color: "#FFF",
                  fontWeight: "bold",
                },
              ]}
            >
              {guest.name}
            </Text>
            {guest.portions.map((portion, portionIndex) => (
              <View key={portionIndex} style={styles.portionCell}>
                <TouchableOpacity
                  style={styles.adjustButtonMinus}
                  onPress={() => adjustPortion(guestIndex, portionIndex, -0.5)}
                >
                  <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.portionText}>{portion.toFixed(1)}</Text>
                <TouchableOpacity
                  style={styles.adjustButtonPlus}
                  onPress={() => adjustPortion(guestIndex, portionIndex, 0.5)}
                >
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#FFF4E5",
  },
  separator: {
    height: 20,
  },
  backButtonContainer: {
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
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
  table: {
    marginBottom: 20,
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#FF7043",
    paddingVertical: 10,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
    paddingVertical: 5,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: "center",
    padding: 5,
  },
  portionCell: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  adjustButtonMinus: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 3,
  },
  adjustButtonPlus: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 3,
  },
  adjustButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  portionText: {
    fontSize: 14,
    textAlign: "center",
    flex: 1,
  },
});
