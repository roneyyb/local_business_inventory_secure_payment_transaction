import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import { connect} from 'react-redux';
import { clearAll } from '../actions/itemlistaction';
import Button from './components/button';

class Mainscreen extends Component {
    constructor(props) {
        super(props);
        props.clearAll();
    }

    makeabill= () => {
        this.props.navigation.navigate('qrcode');
    }

    addProduct = () => {
        this.props.navigation.navigate('addproduct')
    }
    render() {
        return (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white'
            }}>
            <View
              style={{
                flex: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {'Choose Product  '}
              </Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>
                {'Scan And Pay '}
              </Text>
            </View>
            <View style={{flex: 6, paddingHorizontal: '10%'}}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  this.props.navigation.navigate('itemlist');
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#A52745',
                  borderRadius: 20,
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Go to cart  '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.makeabill}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#A52745',
                  borderRadius: 20,
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Add item to cart  '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={this.addProduct}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#A52745',
                  borderRadius: 20,
                  marginHorizontal: 20,
                  paddingVertical: 10,
                  marginVertical: 20,
                }}>
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  {'Add item to inventory   '}
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Button
              buttonLabel={"Make a bill"}
              disabled={false}
              onPressaction={this.makeabill}
              style={{ marginBottom: 40, width: 200 }}
            />
            <Button
              buttonLabel={"Add a product"}
              disabled={false}
              onPressaction={this.addProduct}
              style={{ width: 200 }}
            /> */}
          </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps,{clearAll})(Mainscreen);