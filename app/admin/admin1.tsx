import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { useDataContext } from '../DataContext';

const Admin1 = () => {
  const { ingredients, addIngredient } = useDataContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [currentIngredient, setCurrentIngredient] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [unit, setUnit] = useState('');
  const [avgQuantity, setAvgQuantity] = useState('');
  const [avgPrice, setAvgPrice] = useState('');
  const [notes, setNotes] = useState('');

  const handleDelete = (index: number) => {
    Alert.alert(
      'Delete Ingredient',
      'Are you sure you want to delete this ingredient?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteIngredient(index),
        },
      ]
    );
  };

  const handleEdit = (ingredient: any, index: number) => {
    setName(ingredient.name);
    setCategory(ingredient.category);
    setUnit(ingredient.unit);
    setAvgQuantity(String(ingredient.avgQuantity));
    setAvgPrice(String(ingredient.avgPrice));
    setNotes(ingredient.notes);
    setCurrentIngredient(index);
    setModalVisible(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !category.trim() || !unit.trim()) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const updatedIngredient = {
      name,
      category,
      unit,
      avgQuantity: parseFloat(avgQuantity),
      avgPrice: parseFloat(avgPrice),
      notes,
    };

    if (currentIngredient !== null) {
      await updateIngredient(currentIngredient, updatedIngredient);
    } else {
      await addIngredient(updatedIngredient);
    }

    setModalVisible(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setCategory('');
    setUnit('');
    setAvgQuantity('');
    setAvgPrice('');
    setNotes('');
    setCurrentIngredient(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ingredients}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => handleEdit(item, index)}
            >
              <Text style={styles.itemText}>{item.name}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Ingredient</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add/Edit Ingredient</Text>

            <TextInput style={styles.input} value={name} placeholder="Name" onChangeText={setName} />
            <TextInput style={styles.input} value={category} placeholder="Category" onChangeText={setCategory} />
            <TextInput style={styles.input} value={unit} placeholder="Unit" onChangeText={setUnit} />
            <TextInput
              style={styles.input}
              value={avgQuantity}
              placeholder="Average Quantity"
              keyboardType="numeric"
              onChangeText={setAvgQuantity}
            />
            <TextInput
              style={styles.input}
              value={avgPrice}
              placeholder="Average Price"
              keyboardType="numeric"
              onChangeText={setAvgPrice}
            />
            <TextInput style={styles.input} value={notes} placeholder="Notes" onChangeText={setNotes} />

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'red' },
  item: { flexDirection: 'row', padding: 10, marginVertical: 5, backgroundColor: '#FFA500', borderRadius: 5 },
  itemText: { fontWeight: 'bold', color: 'white' },
  itemCategory: { fontStyle: 'italic', color: 'white' },
  deleteButton: { backgroundColor: 'red', padding: 10, borderRadius: 5 },
  deleteText: { color: 'white' },
  addButton: { backgroundColor: 'green', padding: 15, alignItems: 'center', borderRadius: 5 },
  addButtonText: { color: 'white', fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 10, borderRadius: 5 },
  saveButton: { backgroundColor: 'green', padding: 10, alignItems: 'center', borderRadius: 5 },
  saveButtonText: { color: 'white', fontWeight: 'bold' },
  cancelButton: { backgroundColor: 'red', padding: 10, alignItems: 'center', borderRadius: 5, marginTop: 10 },
  cancelButtonText: { color: 'white', fontWeight: 'bold' },
});

export default Admin1;
