import React, { Component } from 'react';
import { View, Text, Alert, TouchableOpacity, Image, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Card, Input, Button } from 'react-native-elements';
import Constants from 'expo-constants';

const { manifest } = Constants;

export default class Add extends Component {
    state={
        product_name:'',
        product_description: '',
        product_price: '',
        product_expirydate: '',
        product_barcodenumber: '',
        product_image: ''
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: () => 
            <Text style={{
                fontSize: 20,
                color: '#8D8D8C',
            }}>
                {'Add Product'}
            </Text>
        ,
        headerRight: () => 
            <TouchableOpacity
            onPress={
            navigation.getParam('creating')
            }
          >
            <MaterialIcons name='done' style={{marginRight:20}} size={28} width={15} color='#6666FF' />
          </TouchableOpacity>
    })

    componentDidMount() {
        this.props.navigation.setParams({creating: this.addProduct.bind(this)});
    }
    showImage = (item) => {
        return (<Image style={{width:250, height:250, alignSelf:'center'}} source={{ uri: item}} />)
    }

    addProduct() {
        const data = {
            name: this.state.product_name,
            price: this.state.product_price,
            id: this.state.product_barcodenumber,
            image: this.state.product_image,
            expiryDate: this.state.product_expiry,
            desc: this.state.product_description
        }
         console.log(data);
        const url = `http://${manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000/addProduct`)}`;
        console.log(url);
        fetch(url, { 
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(res => {
            if(res.error)
            {
                Alert.alert('Error in server');
                return;
            }
            this.setState({product_name:'',
            product_description: '',
            product_price: '',
            product_expiry: '',
            product_barcodenumber: '',
            product_image: ''});
            this.props.navigation.navigate('main');
            return;
        })
    }
    render() {
        return (
            <ScrollView>      
                      <Card>
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product name'
                label={'Enter Product name here'}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_name: text})}}
                value={this.state.product_name} 
                />
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product description'
                label={'Enter Product description here'}
                containerStyle={{marginTop:20}}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_description: text})}}
                value={this.state.product_description} 
                />
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product barcodenumber'
                label={'Enter Product barcodenumber here'}
                containerStyle={{marginTop:20}}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_barcodenumber: text})}}
                value={this.state.product_barcodenumber} 
                />
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product price'
                label={'Enter Product price here'}
                containerStyle={{marginTop:20}}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_price: text})}}
                value={this.state.product_price} 
                />
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product expiry date'
                label={'Enter Product expiry date here'}
                containerStyle={{marginTop:20}}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_expirydate: text})}}
                value={this.state.product_expirydate} 
                />
                <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product image'
                label={'Enter Product image url here'}
                containerStyle={{marginTop:20}}
                errorStyle={{ color: 'red' }}
                onChangeText={(text) => {this.setState({product_image: text})}}
                value={this.state.product_image} 
                />
                <View style={{ elevation:4}}>
                    {this.state.product_image.length>0 && this.showImage(this.state.product_image)} 
                </View>
            </Card>
            </ScrollView>
        );
    }
}