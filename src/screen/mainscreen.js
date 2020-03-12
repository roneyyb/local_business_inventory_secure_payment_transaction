import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native'; 

export default class Mainscreen extends Component {
    render() {
        return (
            <View style={{ flex:1, backgroundColor: 'white', alignItems:'center', justifyContent:'center' }}>
                <TouchableHighlight style={{ elevation:4, height:50, width:140, borderRadius:3, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}
                onPress={() => {this.props.navigation.navigate('qrcode')}}
                >
                    <Text style={{fontSize:20}}>{'Make A Bill'}</Text>
                </TouchableHighlight>
                <TouchableHighlight style={{ elevation:4, height:50, marginTop:5, width:200, borderRadius:3, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}
                onPress={() => {this.props.navigation.navigate('addproduct')}}
                >
                    <Text style={{fontSize:20}}>{'Add A Product'}</Text>
                </TouchableHighlight>
                
            </View>
        );
    }
}