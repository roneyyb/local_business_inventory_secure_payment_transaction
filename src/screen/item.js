import React, { Component } from 'react';
import { Alert, View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Input} from 'react-native-elements';
import Button from './components/button';
import Constants from 'expo-constants';

const { manifest } = Constants;

export default class ItemList extends Component {
    
    constructor(props) {
        super(props);
        this.barcodenumber = this.props.navigation.getParam('barcodenumber');
        this.state={product: '', quantity: ''};
        console.log(props);
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: () => {
            <Text style={{
                fontSize: 20,
                color: '#8D8D8C',
            }}>
                {'Item Details'}
            </Text>
        }
    })
    componentWillUnmount(){
        console.log('item unmount');
    }
    onSubmit = () => {
        this.props.navigation.navigate('itemlist',{
            product:this.state.product,quantity: this.state.quantity
        })
    }
    render() {
        const {product} = this.state;
        return (
            <ScrollView>
            <View style={{alignItems:'center', justifyContent:'center', elevation:4 }}>
            <Text style={{fontSize:20}}>{`${product.name}`}</Text>
            <Image source={{uri:product.image }} style={{height:200, width:200}}/>
            <Text style={{fontSize:10}}>{`Product Description - ${product.desc}`}</Text>
            <Text style={{fontSize:10}}>{`Product Price - ${product.price}`}</Text>
            </View>
            <View style={{alignItems:'center', justifyContent:'center'}}>
            <Input
                labelstyle={{ fontSize:20, color:'#6666FF' }}
                placeholder='Product Quantity'
                label={'Enter product quantity'}
                onChangeText={(text) => {this.setState({quantity: text})}}
                value={this.state.quantity} 
                />
                 {/* <TouchableOpacity style={{ elevation:4,marginBottom:10, height:50, marginTop:10, width:200, borderRadius:3, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}
              onPress={() => 
                {
                    this.onSubmit()
                }}
                >
                    <Text style={{fontSize:20}}>{'Submit'}</Text>
                </TouchableOpacity> */}
                <Button
            buttonLabel={'Submit'}
            disabled={false}
            onPressaction={this.onSubmit}
            style={{marginTop:40, width:100}}
          />
                </View>
            </ScrollView>
        );
    }

    fetchProductDetails = (barcodenumber) => {
        console.log(barcodenumber);
        const url = `http://${manifest.debuggerHost
        .split(`:`)
        .shift()
        .concat(`:3000/getProduct/${barcodenumber}`)}`;
        fetch(url)
        .then(res => res.json())
        .then(res => {
            if(res.error)
            {
                Alert.alert('server error');
                return;
            }
            this.setState({product: res.product});
            return;
        })
    }
    componentDidMount() {
        this.fetchProductDetails(this.barcodenumber);
    }
}