import React, {Component} from 'react';
import { View } from 'react-native';
import { Header } from 'react-native-elements';


export default class Encabezado extends Component{
  render(){
    return(
      <Header
        placement="center"
        
        centerComponent={{ text: 'Puppy Care', style: { color: '#fff' } }}
       
      />
    );
  }

}