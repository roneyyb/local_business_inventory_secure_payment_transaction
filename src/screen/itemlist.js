import React, {Component} from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, Dimensions, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Item from './components/item';
import Button from './components/button';
import Header from './components/header';
import { Updatelist, clearAll } from '../actions/itemlistaction';

class ItemList extends Component {
    constructor(props) {
        super(props);  
    }
    static navigationOptions = ({navigation}) => ({
        headerTitle: () => 
            <Text style={{
                fontSize: 20,
                color: '#8D8D8C',
            }}>
                {'Total item'}
            </Text>
        ,
        headerRight: () => 
            <Text  style={{
                fontSize: 20,
                color: '#8D8D8C',
                marginRight:20,
            }}>
                {navigation.getParam('totalbill')>0 ? `Bill - ${navigation.getParam('totalbill')}` : ''}
            </Text>
    })
    // componentDidMount() {
    //     console.log(this.props.itemlist);
    //     const item = {
    //         item: this.props.navigation.getParam('item'),
    //         quantity: this.props.navigation.getParam('quantity')
    //     };
    //     console.log(item);
    //     this.props.Updatelist(item, parseInt(item.quantity) * parseInt(item.item.price));
    //     this.props.navigation.setParams({totalbill: this.props.totalprice +parseInt(item.quantity) * parseInt(item.item.price)});
    // }
    
    componentWillUnmount() {
        console.log(' item list unmount');
    }

    addItem = () => {
        this.props.navigation.navigate('qrcode');
    }

    settlePayment = () => {
        this.props.navigation.navigate('paybill');
    }
    render() {
        const { itemlist, totalprice } = this.props;
        return (
            <Header
              navigation={this.props.navigation}
              screen={'main'}
              right={true}
              rightComponent={() => (
                  <Text style={{fontSize:16, color:'black', fontWeight:'bold'}}>{`${totalprice} Rs `}</Text>
              )}
              headerTitle={'Cart '}
              >
              {itemlist.length === 0 ? (
                <View
                  style={{
                      flex:1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Text style={{fontSize:20}}>{'No Item'}</Text>
                </View>
              ) : (
                  <View style={{flex:1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      elevation:2,
                      backgroundColor:'#ffffff',
                      paddingVertical:0
                    }}>
                    <Button
                      buttonLabel={'Add more item  '}
                      disabled={false}
                      onPressaction={this.addItem}
                      style={{width: 200,marginTop:10,marginBottom:5 }}
                    />
                    <Button
                      buttonLabel={'Settle Payment  '}
                      disabled={false}
                      onPressaction={this.settlePayment}
                      style={{width: 200, marginTop: 10, marginBottom: 5}}
                    />
                  </View>
                  <ScrollView>
                    <View style={{alignItems: 'center', marginTop: 10}}>
                      {this.props.itemlist.map((item, index) => (
                        <Item item={item} index={index}/>
                      ))}
                    </View>
                  </ScrollView>
                  </View>)}
            </Header>
          
        );
    }
}

const mapStateToProps = (state) => {
    return {
    totalprice: state.itemlist.total_price,
    itemlist: state.itemlist.items
}
}

export default connect(mapStateToProps,{
    Updatelist,
    clearAll
})(ItemList);