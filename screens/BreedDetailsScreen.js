import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity,StyleSheet,ScrollView } from 'react-native';
import axios from 'axios';
import Swiper from 'react-native-swiper';
//import db from "../firebaseConfig";

const BreedDetailsScreen = ({ route }) => {
  const { breedId } = route.params;
  const [breedDetails, setBreedDetails] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  console.log(breedId)
  useEffect(() => {
    fetchBreedDetails();
    fetchImages();
  }, []);

  const fetchBreedDetails = async () => {
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
        headers: {
          'x-api-key': 'live_u6QGy4G9Q3jHC0nwB10uNcI0DSkgO3E4LtUbDTpvRGFnTi1QG9q3ypE1zfQB09ZY', // Reemplaza 'YOUR_API_KEY' con tu clave API
        },
      });
      setBreedDetails(response.data);

    } catch (error) {
      console.error(error);
    }      
    
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/images/search?breed_id=${breedId}&limit=5`, {
        headers: {
          'x-api-key': 'live_u6QGy4G9Q3jHC0nwB10uNcI0DSkgO3E4LtUbDTpvRGFnTi1QG9q3ypE1zfQB09ZY',
        },
      });
      setImageUrls(response.data.map((image) => image.url));
    } catch (error) {
      console.error(error);
    }
  };

  if (!breedDetails) {
    return <Text>Loading...</Text>;
  } else{
    console.log(breedDetails.name);
    /*const RazaRef =  db
      .collection("razas")
      .where("raza_nombre","==",breedDetails.name)
      .get()*/
  }

  return (
    <View>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>  
      <View style={{ height: 300 }}>   
      
      <Swiper
        
        style={styles.wrapper}
        showsButtons={true}
        showsPagination={false}
        loop={true}
        horizontal={true}
        nextButton={<Text style={{ fontSize: 50, color: 'blue' }}>›</Text>}
        prevButton={<Text style={{ fontSize: 50, color: 'blue' }}>‹</Text>}
      >
        {imageUrls.map((url, index) => (
          <Image key={index} source={{ uri: url }} 
                 style={styles.image} 
                 
          />
        ))}
      </Swiper>
      </View>
      </ScrollView>
      <Text>Raza: {breedDetails.name}</Text>
      <Text>Características: Tamaño {breedDetails.height.metric} cm, peso {breedDetails.weight.metric} kg.</Text>
      <Text>Temperamento: {breedDetails.temperament}</Text>
      <Text>Historia: {breedDetails.bred_for}</Text>
    </View>
  );
};



const styles= StyleSheet.create({
  container: {
    flex: 0.5
  },

  wrapper: {
    flex:0.5,
  },

  

  image: {
    
    flex: 0.6,
    resizeMode: 'contain'
  }
})
export default BreedDetailsScreen;

