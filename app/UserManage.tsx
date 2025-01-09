import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function UserManagement() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botón de vuelta */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("./ManagingBarbecue")}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Contenido principal */}
      <Text style={styles.title}>User Management</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF4E5",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF7043",
    textAlign: "center",
    marginBottom: 20,
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
});
