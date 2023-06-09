import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity,Image, StyleSheet } from 'react-native';
import Encabezado from '../components/Header';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

const HomeScreen = ({ navigation }) => {
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);

  useEffect(() => {
    fetchBreeds();
  }, []);

  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': 'live_u6QGy4G9Q3jHC0nwB10uNcI0DSkgO3E4LtUbDTpvRGFnTi1QG9q3ypE1zfQB09ZY',
        },
      });
      setBreeds(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Encabezado />
      <View style={styles.space} />
      <View >
        
        <RNPickerSelect
        onValueChange={(value) => setSelectedBreed(value)}
        items={breeds.map((breed) => ({ label: breed.name, value: breed.id }))}
        
        style={{
          inputIOS: {
            fontSize: 16,
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: 'gray',
            borderRadius: 4,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          inputAndroid: {
            fontSize: 16,
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderWidth: 0.5,
            borderColor: 'purple',
            borderRadius: 8,
            color: 'black',
            paddingRight: 30, // to ensure the text is never behind the icon
          },
          iconContainer: {
            top: 20,
            right: 10,
          },
          // Add the following styles to move the component to the bottom of the screen
          viewContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
          modalViewBottom: {
            justifyContent: 'flex-end',
          },
        }}
/>

      </View>
      <View style={styles.space} />
      <Button
        title="Search"
        onPress={() => navigation.navigate('BreedDetails', { breedId: selectedBreed })}
      />
        <View style = {styles.container}>
            <Image 
              source={require('../assets/perrito2.jpeg')} 
              style={{ width: 300, height: 300 }}
            />
        </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 16,
  },
  dropbox: {
    marginTop: 100
  },
  space: {
    height: 20,
  },
 
});





export default HomeScreen;
