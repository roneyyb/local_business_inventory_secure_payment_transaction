import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Card, Button} from 'react-native-elements';
import { connect } from 'react-redux';

import { Updatelist, clearAll } from '../actions/itemlistaction';

class ItemList extends Component {
    constructor(props) {
        super(props);   
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: (
            <Text style={{
                fontSize: 20,
                color: '#8D8D8C',
            }}>
                {'Total Product'}
            </Text>
        ),
        headerRight: (
            <Text  style={{
                fontSize: 20,
                color: '#8D8D8C',
                marginRight:20,
            }}>
                {navigation.getParam('totalbill')>0 ? `Bill - ${navigation.getParam('totalbill')}` : ''}
            </Text>
        ) 
    })
    componentDidMount() {
        console.log(this.props.itemlist);
        const item = {
            product: this.props.navigation.getParam('product'),
            quantity: this.props.navigation.getParam('quantity')
        };
        console.log(item);
        this.props.Updatelist(item, parseInt(item.quantity) * parseInt(item.product.price));
        this.props.navigation.setParams({totalbill: this.props.totalprice +parseInt(item.quantity) * parseInt(item.product.price)});
    }
    
    componentWillUnmount() {
        console.log(' item list unmount');
    }


    renderItems = (item) => {
        console.log(item);
        return(
            <Card key={item.product.id}> 
            <Text style={{fontSize:20}}>{`${item.product.name}`}</Text>
            <Image source={{uri:item.product.image }} style={{height:200, width:200}}/>
            <Text style={{fontSize:20}}>{`Product Description - ${item.product.desc}`}</Text>
            <Text style={{fontSize:20}}>{`Product Price - ${item.product.price}`}</Text>
            <Text style={{fontSize:20}}>{`Product Quantity - ${item.quantity}`}</Text>
            </Card>
        );
    }

    render() {
        return (
            <ScrollView >
                {this.props.itemlist.map((item) => this.renderItems(item))}
                
                <View style={{alignItems:'center', justifyContent:'center', marginTop:10}}>
                <TouchableOpacity style={{ elevation:4, marginTop:10,height:50, width:200, borderRadius:3, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}
              onPress={() => this.props.navigation.navigate('qrcode')}
                >
                    <Text style={{fontSize:20}}>{'Add more item'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ elevation:4,marginBottom:10, height:50, marginTop:10, width:200, borderRadius:3, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}
              onPress={() => 
                {
                    this.props.clearAll();
                    this.props.navigation.navigate('paybill');
                }}
                >
                    <Text style={{fontSize:20}}>{'Settle Payment'}</Text>
                </TouchableOpacity>
                </View>
                </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    console.log('state', state);
    return {
    totalprice: state.itemlist.total_price,
    itemlist: state.itemlist.items
}
}

export default connect(mapStateToProps,{
    Updatelist,
    clearAll
})(ItemList);