import React, { useState } from 'react';
import { Pressable, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function User1() {
  const router = useRouter();
  const handleSubmit = () => {};

  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});

  const items = ['Item 1', 'Item 2', 'Item 3'];

  const handleSelect = (item: string) => {
    setSelectedItems({ ...selectedItems, [item]: (selectedItems[item] || 0) + 1 });
  };

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push("/")}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>

    <View style={styles.container}>
      <Text style={styles.title}>What Will You Eat?</Text>
      <View style={styles.displayBox}>
        {items.map((item) => (
          <View key={item} style={styles.itemContainer}>
            <Text>{item}</Text>
            {selectedItems[item] ? (
              <TextInput
                style={styles.quantityInput}
                value={selectedItems[item].toString()}
                keyboardType="numeric"
                onChangeText={(text) => setSelectedItems({ ...selectedItems, [item]: parseInt(text) })}
              />
            ) : (
              <TouchableOpacity style={styles.button} onPress={() => handleSelect(item)}>
                <Text style={styles.buttonText}>Select</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button_save}>
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
    fontSize: 16,
    paddingHorizontal: 5,
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
    paddingHorizontal: 20,
  },
});
