import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function IngredientList() {
  const router = useRouter();

  // Datos simulados de ingredientes y raciones seleccionadas por invitados
  const guests = [
    {
      name: "John",
      ingredients: [
        { name: "Beef", portions: 2 },
        { name: "Beer", portions: 1 },
      ],
    },
    {
      name: "Mary",
      ingredients: [
        { name: "Chicken", portions: 3 },
        { name: "Soft Drinks", portions: 2 },
      ],
    },
    {
      name: "Peter",
      ingredients: [
        { name: "Sausages", portions: 4 },
        { name: "Vegetables", portions: 1 },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Botón de vuelta */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("./ManagingBarbecue")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Selected Portions by Guests</Text>

      {/* Lista de invitados */}
      <FlatList
        data={guests}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.guestItem}>
            <Text style={styles.guestName}>{item.name}</Text>
            {/* Lista de ingredientes por invitado */}
            <FlatList
              data={item.ingredients}
              keyExtractor={(ingredient) => ingredient.name}
              renderItem={({ item: ingredient }) => (
                <Text style={styles.ingredientText}>
                  {ingredient.name}: {ingredient.portions} portion(s)
                </Text>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF4E5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7043",
    textAlign: "center",
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
  guestItem: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "#FF7043",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  guestName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF7043",
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: "#555",
  },
});
