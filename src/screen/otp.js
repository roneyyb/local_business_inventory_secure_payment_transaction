import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { connect } from 'react-redux';
import { DotIndicator } from 'react-native-indicators';
import Button from './components/button';
import Textinput from './components/otpfulltextinput';

export default class Otp extends Component {

    onSubmitotp = () => {
        let otp = this.otpf.state.vf;
        if(otp.length==6) {
            const url = `http://localhost:3000/otpgeneration`;
            fetch(url,{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    check:2,
                    otp: otp
                })
            })
            .then(res => res.json())
            .then(res => {
                
            })
        }
    }
    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.Container1}>
                   <Text style={[styles.Textstyle,{marginBottom:0}]}> 
                        {'   Enter Otp  '}
                    </Text>
                </View>               
                <View style={styles.Container2}>
                    <Textinput ref={child => {this.otpf = child}}/>
                    <Button onPressaction={() => {}} disabled={false} buttonLabel={'Submit'} style={{ width:100, marginTop:200}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        flexDirection:'column'
    },
    Container1: {
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#ADD8E6'
    },
    Textstyle: {
        fontSize:20,
        color:'black',
        fontWeight:'bold',
    },
    Container2: {
        flex:8,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        alignItems:'center'
    }
});