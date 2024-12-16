import React from 'react';
import { Pressable, View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import { useRouter } from 'expo-router';
import LinearGradient from 'react-native-linear-gradient';

export default function Admin1() {
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
        <LinearGradient
    	  colors={['rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0)']}
    	  style={styles.gradient}
        />
        <FlatList
          data={ingredients}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
	  showsVerticalScrollIndicator={false}
        />
	<LinearGradient
    	  colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
    	  style={styles.gradient}
  	/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
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
    padding: 21,
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  listWrapper: {
    position: 'relative',
    width: '80%',
    height: 400,
    overflow: 'hidden',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
    zIndex: 1,
  },
  listContainer: {
    alignItems: 'left',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    marginVertical: 2,
    alignSelf: 'flex-start',
  },
  listItemText: {
    fontSize: 16,
    color: '#333333',
  },


  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingVertical: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'grey',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

