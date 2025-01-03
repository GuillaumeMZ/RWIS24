import React, { useState } from 'react';
import { Pressable, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '../DataContext';

export default function User1() {
  const { ingredients, addUserSelection } = useDataContext();
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  const handleSelect = (ingredient: string) => {
    setSelectedItems((prev) => ({ ...prev, [ingredient]: (prev[ingredient] || 0) + 1 }));
  };

  const handleSave = () => {
    Object.keys(selectedItems).forEach((ingredient) => {
      const ingredientData = ingredients.find((item) => item.name === ingredient);
      if (ingredientData) {
        addUserSelection('User1', ingredient, selectedItems[ingredient], ingredientData.price);
      }
    });
  };

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>What Will You Eat?</Text>
        <View style={styles.displayBox}>
          {ingredients.map((ingredient) => (
            <View key={ingredient.name} style={styles.itemContainer}>
              <Text>{ingredient.name}</Text>
              <Text>{`$${ingredient.price.toFixed(2)}`}</Text>
              {selectedItems[ingredient.name] ? (
                <TextInput
                  style={styles.quantityInput}
                  value={selectedItems[ingredient.name].toString()}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setSelectedItems({ ...selectedItems, [ingredient.name]: parseInt(text) })
                  }
                />
              ) : (
                <TouchableOpacity style={styles.button} onPress={() => handleSelect(ingredient.name)}>
                  <Text style={styles.buttonText}>Select</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button_save} onPress={handleSave}>
          <Text style={styles.buttonText_save}>Save</Text>
        </TouchableOpacity>
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
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  displayBox: {
    backgroundColor: 'white',
    width: '70%',
    alignSelf: 'center',
    minHeight: 200,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quantityInput: {
    borderWidth: 1,
    padding: 5,
    width: 60,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  button_save: {
    padding: 10,
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 20,
    width: 150,
    alignSelf: 'center',
  },
  buttonText_save: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

