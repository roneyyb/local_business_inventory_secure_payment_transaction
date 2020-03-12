//import React, { Component } from 'react';
//import { Text, View } from 'react-native';
//import Create from './database/create';
//import Insert from './database/insert';
//import Select from './database/select';
//import Insert_task from './database/insert_task';

//export default class App extends Component {
  //constructor(props) {
    //super(props);
    //console.log('constructor');
  //}

  //async componentDidMount() {
    //await Create();
    //await Insert('expenses');
    //await Select();
    //await Insert_task();
  //}
  //render() {
   // return(
 //           <View style={{flex:1, alignItem:'center', justifyContent:'center'}}>
//              <Text>{'Database'}</Text>
//            </View>
//    );
//  }
 import React from 'react';
 import { PersistGate } from 'redux-persist/integration/react';
 import { persistor, store } from './src/navigator/persistor';
 import {  Provider } from 'react-redux';
 import { StyleSheet, Text, View } from 'react-native';
 import AppContainer from './src/navigator/stack';
 export default function App() {
   return ( 
     <Provider store={store}>
       <PersistGate persistor={persistor}>
     <AppContainer />
     </PersistGate>
     </Provider>
   );
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
     alignItems: 'center',
     justifyContent: 'center',
   },
 });
