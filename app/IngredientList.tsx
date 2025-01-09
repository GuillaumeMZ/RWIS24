import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const ingredients = [
  { id: 1, name: "Beef", portionSize: 300, unit: "grams" },
  { id: 2, name: "Chicken", portionSize: 300, unit: "grams" },
  { id: 3, name: "Sausages", portionSize: 200, unit: "grams" },
  { id: 4, name: "Beer", portionSize: 3, unit: "cans" },
  { id: 5, name: "Soft Drinks", portionSize: 3, unit: "cans" },
  { id: 6, name: "Vegetables", portionSize: 50, unit: "grams" },
  { id: 7, name: "Bread", portionSize: 2, unit: "units" },
  { id: 8, name: "Sauces", portionSize: 0.5, unit: "bottles" },
];

export default function IngredientList() {
  const router = useRouter();
  const [selectedQuantities, setSelectedQuantities] = useState(
    ingredients.map((ingredient) => ({
      id: ingredient.id,
      portions: 1, // Por defecto, 1 ración por ingrediente
    }))
  );

  const adjustPortions = (id: number, adjustment: number) => {
    setSelectedQuantities((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              portions: Math.max(item.portions + adjustment, 0), // Evita raciones negativas
            }
          : item
      )
    );
  };

  const getPortions = (id: number) => {
    return selectedQuantities.find((item) => item.id === id)?.portions || 0;
  };

  // Función para formatear números eliminando .00 si es entero
  const formatNumber = (num: number) => {
    return Number.isInteger(num) ? num.toString() : num.toFixed(1);
  };

  return (
    <View style={styles.container}>
      {/* Botón de vuelta */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push("./UserBase")}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Título y subtítulo */}
      <Text style={styles.title}>Select how much you want of every food!</Text>
      <Text style={styles.subtitle}>
        Quantities for a normal person correspond to 1 portion.
      </Text>

      {/* Lista de ingredientes */}
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const portions = getPortions(item.id);
          const quantity = portions * item.portionSize; // Calcula la cantidad total

          return (
            <View style={styles.ingredientItem}>
              <Text style={styles.ingredientName}>{item.name}</Text>
              <View style={styles.controls}>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => adjustPortions(item.id, -0.5)}
                >
                  <Text style={styles.adjustButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>
                  {formatNumber(quantity)} {item.unit} ({formatNumber(portions)} portion
                  {portions === 1 ? "" : "s"})
                </Text>
                <TouchableOpacity
                  style={styles.adjustButton}
                  onPress={() => adjustPortions(item.id, 0.5)}
                >
                  <Text style={styles.adjustButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />

      {/* Botón final */}
      <TouchableOpacity
        style={styles.finalButton}
        onPress={() => router.push("./UserFinal")}
      >
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
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FF7043",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
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
    marginVertical: 10,
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
    backgroundColor: "#4CAF50",
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
