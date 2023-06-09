import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity,Image, StyleSheet } from 'react-native';
import Encabezado from '../components/Header';
import axios from 'axios';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


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
      //console.log(response.data[1].name)
      //console.log(breeds[0].name);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Encabezado />
      <View style={styles.space} />
      <View styles = {styles.dropbox}>
          <Dropdown
            data={breeds}
            value={selectedBreed}
            labelField='name'
            onChangeText={value => setSelectedBreed(value)}
          />
      </View>
      <View style={styles.space} />
      <Button
        title="Search"
        onPress={() => navigation.navigate('BreedDetails', { breedId: selectedBreed })}
      />
      <View style = {styles.container}>
          <Image 
            source={require('../assets/perrito1.jpeg')} 
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
