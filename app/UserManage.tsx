import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
    { name: "Beef Skewers", portionSize: 300, unit: "grams" },
    { name: "Chicken Skewers", portionSize: 300, unit: "grams" },
    { name: "Sausages", portionSize: 200, unit: "grams" },
    { name: "Beer", portionSize: 2, unit: "cans" },
    { name: "Soft Drinks", portionSize: 2, unit: "cans" },
    { name: "Vegetables", portionSize: 50, unit: "grams" },
    { name: "Bread", portionSize: 2, unit: "units" },
    { name: "Sauces", portionSize: 0.5, unit: "bottles" },
  ];

  const [selectedGuestIndex, setSelectedGuestIndex] = useState(0);

  const adjustPortion = (portionIndex: number, adjustment: number) => {
    const updatedGuests = [...guestData];
    const guest = updatedGuests[selectedGuestIndex];
    guest.portions[portionIndex] = Math.max(guest.portions[portionIndex] + adjustment, 0);
    setGuestData(updatedGuests);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botón de vuelta */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./ManagingBarbecue")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Separador */}
      <View style={styles.separator} />

      <Text style={styles.title}>Guest Portion Management</Text>
      <Text style={styles.subtitle}>
        Total Guests: <Text style={styles.subtitleHighlight}>{guestData.length}</Text>
      </Text>

      {/* Selector de invitados */}
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Guest:</Text>
        <Picker
          selectedValue={selectedGuestIndex}
          onValueChange={(value) => setSelectedGuestIndex(value)}
          style={styles.picker}
        >
          {guestData.map((guest, index) => (
            <Picker.Item key={index} label={guest.name} value={index} />
          ))}
        </Picker>
      </View>

      {/* Lista de ingredientes */}
      <View style={styles.ingredientsContainer}>
        {columns.map((col, index) => {
          const portions = guestData[selectedGuestIndex].portions[index];
          const totalQuantity = portions * col.portionSize;

          return (
            <View key={index} style={styles.ingredientRow}>
              <Text style={styles.ingredientName}>{col.name}</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.adjustButtonMinus}
                  onPress={() => adjustPortion(index, -0.5)}
                >
                  <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <View style={styles.portionContainer}>
                  <Text style={styles.portionText}>{portions.toFixed(1)} portions</Text>
                  <Text style={styles.unitText}>
                    ({totalQuantity.toFixed(0)} {col.unit})
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.adjustButtonPlus}
                  onPress={() => adjustPortion(index, 0.5)}
                >
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
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
  backButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
  subtitleHighlight: {
    fontWeight: "bold",
    color: "#FF7043",
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 10,
  },
  ingredientsContainer: {
    marginTop: 10,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    flex: 2,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
    justifyContent: "space-between",
  },
  adjustButtonMinus: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  adjustButtonPlus: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  adjustButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  portionContainer: {
    alignItems: "center",
    flex: 2,
  },
  portionText: {
    fontSize: 14,
    textAlign: "center",
    color: "#333",
  },
  unitText: {
    fontSize: 12,
    color: "#555",
  },
});
