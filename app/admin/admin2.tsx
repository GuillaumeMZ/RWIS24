import React, { useState } from 'react';
import { Pressable, View, Text, FlatList, Modal, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDataContext } from '../DataContext';

export default function Admin2() {
  const router = useRouter();
  const { userData } = useDataContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const renderItem = ({ item }: { item: { name: string; selectedIngredients: any } }) => (
    <View style={styles.listItem}>
      <Text style={styles.listItemText}>{item.name}</Text>
      <Pressable onPress={() => { setSelectedUser(item); setModalVisible(true); }}>
        <Text style={styles.listItemText}>View Selections</Text>
      </Pressable>
    </View>
  );

  return (
    <>
      <Pressable style={styles.returnToMenuButton} onPress={() => router.push('/')}>
        <Text style={styles.returnToMenuButtonText}>Main Menu</Text>
      </Pressable>
      <View style={styles.container}>
        <FlatList
          data={userData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedUser?.name}'s Selections</Text>
            {Object.keys(selectedUser?.selectedIngredients || {}).map((ingredient) => {
              const { quantity, price } = selectedUser.selectedIngredients[ingredient];
              return (
                <Text key={ingredient}>{ingredient}: {quantity} units @ ${price.toFixed(2)}</Text>
              );
            })}
            <Pressable style={styles.button} onPress={() => setModalVisible(false)}>
              <Text style={styles.buttonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
    width: '70%',
    alignSelf: 'center',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginVertical: 5,
  },
  listItemText: {
    fontSize: 16,
    color: '#333333',
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
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

