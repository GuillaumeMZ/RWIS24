import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { useRouter } from 'expo-router';

export default function Admin2() {
  const router = useRouter();

  const ingredients = [
    'Sugar',
    'Salt',
    'Flour',
    'Butter',
    'Eggs',
    'Milk',
    'Baking Powder',
    'Sugar',
    'Salt',
    'Flour',
    'Butter',
    'Eggs',
    'Milk',
    'Baking Powder',
    'Vanilla Extract',
    'Sugar',
    'Salt',
    'Flour',
    'Butter',
    'Eggs',
    'Milk',
    'Baking Powder',
    'Vanilla Extract',
  ];

  const renderItem = ({ item }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item}</Text>
    </View>
  );

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({

  returnToMenuButton: {
    backgroundColor: 'red',
  },
  returnToMenuButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,

    marginLeft: 20,
    marginTop: 20,
  },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  listContainer: {
    alignItems: 'left',
    width: '70%',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginVertical: 2,
    alignItems: 'left',
    width: '80%', 
  },
  listItemText: {
    fontSize: 16,
    color: '#333333',
    marginHorizontal: 10,
  },
});

