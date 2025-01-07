import React, { useState, useEffect } from 'react';
import { Pressable, View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { useDataContext } from '../DataContext';

export default function Admin0() {
  const router = useRouter();
  const [barbecueName, setBarbecueName] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  const dataFilePath = `${FileSystem.documentDirectory}barbecue.json`;
  const { clearUsers } = useDataContext(); // Add clearUsers from context

  useEffect(() => {
    const loadBarbecueData = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(dataFilePath);
        if (fileInfo.exists) {
          const data = await FileSystem.readAsStringAsync(dataFilePath);
          const barbecueData = JSON.parse(data);

          setBarbecueName(barbecueData.barbecueName || '');
          setLocation(barbecueData.location || '');
          setDate(barbecueData.date || '');
          setDescription(barbecueData.description || '');
          setCode(barbecueData.code || '');
        }
      } catch (error) {
        console.error('Error loading barbecue data:', error);
      }
    };

    loadBarbecueData();
  }, []);

  const handleSave = async () => {
    const barbecueData = { barbecueName, location, date, description, code };

    try {
      await FileSystem.writeAsStringAsync(dataFilePath, JSON.stringify(barbecueData));
      Alert.alert('Success', 'Barbecue data saved successfully!');
    } catch (error) {
      console.error('Error saving barbecue data:', error);
      Alert.alert('Error', 'Failed to save barbecue data.');
    }
  };

  const handleDelete = async () => {
    try {
      const fileInfo = await FileSystem.getInfoAsync(dataFilePath);
      if (fileInfo.exists) {
        await FileSystem.deleteAsync(dataFilePath);
        clearUsers(); // Clear the users from DataContext
        setBarbecueName('');
        setLocation('');
        setDate('');
        setDescription('');
        setCode('');
        Alert.alert('Deleted', 'Barbecue data deleted successfully!');
      } else {
        Alert.alert('Error', 'No barbecue data file exists to delete.');
      }
    } catch (error) {
      console.error('Error deleting barbecue data:', error);
      Alert.alert('Error', 'Failed to delete barbecue data.');
    }
  };

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Back to Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <Text style={styles.title}>Barbecue Info</Text>

        <TextInput
          style={styles.input}
          placeholder="Barbecue Name"
          value={barbecueName}
          onChangeText={setBarbecueName}
        />
        <TextInput
          style={styles.input}
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date}
          onChangeText={setDate}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Join Barbecue Code"
          value={code}
          onChangeText={setCode}
        />

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  returnToMenuButton: {
    backgroundColor: 'orange',
    borderRadius: 20,
    position: 'absolute',
    top: 20,   
    left: 15,
    height:40,
    width:110,
    zIndex:2,
    
  },
  returnToMenuButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 10,
    marginTop:10, 
    zIndex:3,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
    width: 300,
  },
  textArea: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    height: 100,
    width: 300,
    borderRadius: 20,
  },
  button: {
    backgroundColor: 'green', // Color verde para el botón Save
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10, // Separación entre botones
  },
  deleteButton: {
    backgroundColor: '#FFC107', // Amarillo brillante (hex) que resalta sobre rojo
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 10, // Separación entre botones
  },
  buttonRow: {
    flexDirection: 'row', // Organiza los botones en fila
    justifyContent: 'space-between', // Espacio uniforme entre botones
    alignItems: 'center', // Centra los botones verticalmente
    marginHorizontal: 20, // Espacio desde los bordes del contenedor
  },
  buttonText: {
    color: 'white', // Texto blanco para el botón Save
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButtonText: {
    color: '#000', // Negro para el texto en el botón Delete, visible sobre amarillo
    fontWeight: 'bold',
    fontSize: 16,
  },
});
