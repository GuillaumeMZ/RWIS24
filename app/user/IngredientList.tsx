import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useBarbecueContext } from "../../context/BarbecueContext";

export default function IngredientList() {
  const router = useRouter();
  const { userName }: { userName: string } = useLocalSearchParams();
  const { barbecues, updateUserQuantities, calculateDistribution } = useBarbecueContext();
  const selectedBarbecue = barbecues.find((barbecue) => barbecue.selected);

  const [selectedQuantities, setSelectedQuantities] = useState(
    selectedBarbecue?.ingredients.map((ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      portions: 1, // Default to 1 portion
    })) || []
  );

  const adjustPortions = (id: number, adjustment: number) => {
    setSelectedQuantities((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, portions: Math.max(item.portions + adjustment, 0) } : item
      )
    );
  };

  const handleConfirm = () => {
    // Update user's selected quantities in the context
    updateUserQuantities(selectedBarbecue.id, userName, selectedQuantities);

    // Recalculate the distribution for all users
    calculateDistribution(selectedBarbecue.id);

    // Navigate to UserFinal.tsx after ensuring distribution is calculated
    router.push({
      pathname: "./UserFinal",
      params: { userName },
    });
  };

  if (!selectedBarbecue) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No barbecue selected!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push({ pathname: "./UserBase" })}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Select your quantities</Text>
      <Text style={styles.subtitle}>
        Adjust the portions for the ingredients you want.
      </Text>

      {/* Ingredient List */}
      <FlatList
        data={selectedBarbecue.ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const quantity = selectedQuantities.find((q) => q.id === item.id)?.portions || 1;

          return (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => adjustPortions(item.id, -1)}
                >
                  <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{quantity} portions</Text>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => adjustPortions(item.id, 1)}
                >
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Confirm Button */}
      <TouchableOpacity style={styles.finalButton} onPress={handleConfirm}>
        <Text style={styles.finalButtonText}>おいしいです!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
    color: "#FF7043",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
  },
  ingredientItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#FF7043",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  ingredientName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 5,
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  adjustButton: {
    backgroundColor: "#FFA726",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  adjustButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  finalButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  finalButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

