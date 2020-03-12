import * as React from 'react';
import { Text, Dimensions, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
//import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default class BarcodeScanner extends React.Component {
  state = {
    scanned: false,
  };
  render() {
    const { scanned } = this.state;
    return (
      <View
        style={{
          flex: 1,
          paddingTop:STATUS_BAR_HEIGHT,
          flexDirection: 'column'
        }}>
            <View style={{
                backgroundColor:'black',
                alignItems:'center',
                justifyContent:'center',
                height: SCREEN_HEIGHT * 0.2,
                width:SCREEN_WIDTH
            }}>
            <Text style={{
                fontSize:20,
                color:'#8d8d8c'
            }}>{'Barcode Scanner'}</Text>
            </View>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{
              width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT * 0.6}}
        />
        <View style={{
                backgroundColor:'black',
                alignItems:'center',
                justifyContent:'center',
                height: SCREEN_HEIGHT * 0.2,
                width:SCREEN_WIDTH
            }} />
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.props.navigation.navigate('item', {
        barcodenumber: data
    });
  };
}