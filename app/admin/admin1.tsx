import React, { useState } from 'react';
import { Pressable, View, Text, TouchableOpacity, Modal, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '../DataContext';

export default function Admin1() {
  const { addIngredient } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientPrice, setIngredientPrice] = useState('');
  const router = useRouter();

  const handleAddIngredient = () => {
    if (ingredientName && ingredientPrice) {
      addIngredient({ name: ingredientName, price: parseFloat(ingredientPrice) });
      setModalVisible(false);
      setIngredientName('');
      setIngredientPrice('');
    }
  };

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Add Ingredient</Text>
        </TouchableOpacity>

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Enter Ingredient Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Ingredient Name"
                value={ingredientName}
                onChangeText={setIngredientName}
              />
              <TextInput
                style={styles.input}
                placeholder="Price"
                value={ingredientPrice}
                keyboardType="numeric"
                onChangeText={setIngredientPrice}
              />
              <TouchableOpacity style={styles.button} onPress={handleAddIngredient}>
                <Text style={styles.buttonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});
