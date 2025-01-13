import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useBarbecueContext } from "../../context/BarbecueContext";

export default function UserFinal() {
  const router = useRouter();
  const { barbecues, getDistributionForUser, calculateDistribution } = useBarbecueContext();
  const { userName }: { userName: string } = useLocalSearchParams();
  const [userDistribution, setUserDistribution] = useState(null);

  // Find the selected barbecue
  const selectedBarbecue = React.useMemo(
    () => barbecues.find((barbecue) => barbecue.selected),
    [barbecues]
  );

  useEffect(() => {
    if (selectedBarbecue && userName) {
      // Calculate distribution only if it hasn't been calculated already
      if (!selectedBarbecue.distributionMatrix) {
        calculateDistribution(selectedBarbecue.id);
      }

      // Fetch the user's distribution
      const distribution = getDistributionForUser(selectedBarbecue.id, userName);
      setUserDistribution(distribution);
    }
  }, [selectedBarbecue, userName]);

  if (!selectedBarbecue) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No barbecue selected!</Text>
      </View>
    );
  }

  if (!userDistribution || userDistribution.length === 0) {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            router.push({
              pathname: "./IngredientList",
              params: { userName },
            })
          }
        >
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>No items found in your distribution!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.push({
            pathname: "./IngredientList",
            params: { userName },
          })
        }
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{userName}, here is your contribution:</Text>

      <FlatList
        data={userDistribution}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>
              - {item.quantity} ({item.cost})
            </Text>
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
  backButton: {
    backgroundColor: "#FF7043",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#FF7043",
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

