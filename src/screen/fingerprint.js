import react, { Component } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

export default class FingerPrint extends Component {

    
    render() {
        return (
            <View style={styles.mainview}>
                <View>
                <ActivityIndicator size={'large'} color={'black'} />
                </View>
        <Text>{'Please Give Your Finger Print For Authentication'}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   mainview: {
       flex:1,
       alignItems:'center',
       justifyContent:'center',
       flexDirection:'column',
   } 
});