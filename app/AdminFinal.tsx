import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useRouter } from "expo-router";

export default function UserFinal() {
  const router = useRouter();

  const totalIngredients = [
    { id: 1, name: "Beef", quantity: "4500.00 grams", price: "9000 yen" },
    { id: 2, name: "Chicken", quantity: "3600.00 grams", price: "7200 yen" },
    { id: 3, name: "Sausages", quantity: "2400.00 grams", price: "4800 yen" },
    { id: 4, name: "Beer", quantity: "36.00 cans", price: "3600 yen" },
    { id: 5, name: "Soft Drinks", quantity: "36.00 cans", price: "3600 yen" },
    { id: 6, name: "Vegetables", quantity: "700.00 grams", price: "1400 yen" },
    { id: 7, name: "Bread", quantity: "14.00 units", price: "1400 yen" },
    { id: 8, name: "Sauces", quantity: "7.50 bottles", price: "1500 yen" },
  ];

  const guestDistributions = [
    {
      name: "John",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Mary",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Peter",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Anna",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Louis",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Sophia",
      portions: [
        { name: "Beef", quantity: "675.00 grams", cost: "1800.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
    {
      name: "Charles",
      portions: [
        { name: "Beef", quantity: "450.00 grams", cost: "1200.00 yen" },
        { name: "Chicken", quantity: "675.00 grams", cost: "675.00 yen" },
      ],
      totalCost: "1875.00 yen",
    },
    {
      name: "Laura",
      portions: [
        { name: "Chicken", quantity: "1875.00 grams", cost: "1875.00 yen" },
      ],
      totalCost: "1875.00 yen",
    },
    {
      name: "James",
      portions: [
        { name: "Chicken", quantity: "1050.00 grams", cost: "1050.00 yen" },
        { name: "Sausages", quantity: "400.00 grams", cost: "800.00 yen" },
      ],
      totalCost: "1850.00 yen",
    },
    {
      name: "Clara",
      portions: [
        { name: "Sausages", quantity: "950.00 grams", cost: "1900.00 yen" },
      ],
      totalCost: "1900.00 yen",
    },
    {
      name: "Daniel",
      portions: [
        { name: "Sausages", quantity: "950.00 grams", cost: "1900.00 yen" },
      ],
      totalCost: "1900.00 yen",
    },
    {
      name: "Helen",
      portions: [
        { name: "Sausages", quantity: "100.00 grams", cost: "200.00 yen" },
        { name: "Beer", quantity: "36.00 cans", cost: "420.00 yen" },
        { name: "Soft Drinks", quantity: "12.75 cans", cost: "1275.00 yen" },
      ],
      totalCost: "1895.00 yen",
    },
    {
      name: "Michael",
      portions: [
        { name: "Soft Drinks", quantity: "18.75 cans", cost: "1875.00 yen" },
      ],
      totalCost: "1875.00 yen",
    },
    {
      name: "Paula",
      portions: [
        { name: "Soft Drinks", quantity: "4.50 cans", cost: "450.00 yen" },
        { name: "Vegetables", quantity: "700.00 grams", cost: "1400.00 yen" },
        { name: "Bread", quantity: "2.00 units", cost: "50.00 yen" },
      ],
      totalCost: "1900.00 yen",
    },
    {
      name: "Andrew",
      portions: [
        { name: "Bread", quantity: "12.00 units", cost: "300.00 yen" },
        { name: "Sauces", quantity: "7.50 bottles", cost: "1500.00 yen" },
      ],
      totalCost: "1800.00 yen",
    },
  ];

  type Guest = {
    name: string;
    portions: { name: string; quantity: string; cost: string }[];
    totalCost: string;
  };

  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCopyAllToClipboard = () => {
    const allGuestsText = guestDistributions
      .map((guest) => {
        const items = guest.portions
          .map(
            (item) =>
              `  - ${item.quantity} of ${item.name} (${item.cost})`
          )
          .join("\n");
        return `${guest.name} needs to buy:\n${items}\nTotal cost for ${guest.name}: ${guest.totalCost}`;
      })
      .join("\n\n");
    Clipboard.setStringAsync(allGuestsText);
    alert("All guests' distributions copied to clipboard!");
  };

  const renderGuestDistribution = (guest: { name: any; portions: any; totalCost: any; }) => {
    const items = guest.portions.map((item: { quantity: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; cost: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
      <Text key={index} style={styles.itemText}>
        - {item.quantity} of {item.name} ({item.cost})
      </Text>
    ));

    return (
      <View>
        <Text style={styles.guestName}>{guest.name} needs to buy:</Text>
        {items}
        <Text style={styles.totalCost}>
          Total cost for {guest.name}: {guest.totalCost}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Final Summary</Text>

      {/* Lista total de ingredientes */}
      <Text style={styles.sectionTitle}>Total Ingredients Needed:</Text>
      {totalIngredients.map((item) => (
        <View key={item.id} style={styles.ingredientItem}>
          <Text style={styles.ingredientText}>
            {item.name}: {item.quantity} - {item.price}
          </Text>
        </View>
      ))}

      {/* Lista de invitados */}
      <Text style={styles.sectionTitle}>Guests and Their Contributions:</Text>
      <View style={styles.guestList}>
        {guestDistributions.map((guest, index) => (
          <TouchableOpacity
            key={index}
            style={styles.guestButton}
            onPress={() => {
              setSelectedGuest(guest);
              setIsModalVisible(true);
            }}
          >
            <Text style={styles.guestButtonText}>{guest.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botones de acciones */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./ManagingBarbecue")}
      >
        <Text style={styles.backButtonText}>Back to BBQ Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.copyButton}
        onPress={handleCopyAllToClipboard}
      >
        <Text style={styles.copyButton}>Copy Full Distribution</Text>
      </TouchableOpacity>

      {/* Modal para un invitado específico */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedGuest && renderGuestDistribution(selectedGuest)}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
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
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  ingredientItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#333",
  },
  guestList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  guestButton: {
    backgroundColor: "#FFA726",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    width: "45%",
    alignItems: "center",
  },
  guestButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    backgroundColor: "rgb(255, 111, 67)",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  copyButton: {
    backgroundColor: "#4caf50",
    padding: 5,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
  },
  totalCost: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: "#ff7043",
    padding: 10,
    borderRadius: 5,
    marginTop: 0,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
