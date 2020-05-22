import React, {Component} from 'react';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
//import AwesomeAlert 'react-native-awesome-alerts';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Server from '../constants/Server';
import axios from 'axios';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import Input from './components/TextInput';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default class Add extends Component {
  state = {
    product_name: '',
    product_description: '',
    product_price: '',
    product_expirydate: '',
    product_barcodenumber: '',
    product_image: '',
  };

  static navigationOptions = {header: () => null};

  render() {
    return <View />;
  }

  componentWillUnmount() {
    this.setState({
      product_name: '',
      product_description: '',
      product_price: '',
      product_expiry: '',
      product_barcodenumber: '',
      product_image: '',
    });
  }
  showImage = (item) => {
    return (
      <Image
        style={{width: 250, height: 250, alignSelf: 'center'}}
        source={{uri: item}}
      />
    );
  };

  handleError(error) {
    function isNetworkError(err) {
      return !!err.isAxiosError && !err.response;
    }

    let message;
    if (isNetworkError(error)) {
      message = 'Network Error';
    } else {
      let responseJson = error.response.data;
      message = responseJson.message;
    }
    console.log(message);
    Alert.alert(message);
  }

  addProduct() {
    const data = {
      name: this.state.product_name,
      price: this.state.product_price,
      id: this.state.product_barcodenumber,
      image: this.state.product_image,
      expiryDate: this.state.product_expiry,
      desc: this.state.product_description,
    };

    if (
      data.name.length == 0 ||
      data.price.length == 0 ||
      data.id.length == 0 ||
      data.image.length == 0 ||
      data.expiryDate == 0 ||
      data.desc == 0
    ) {
      Alert.alert('Dont leave any field empty');
      return;
    }

    axios
      .post(`${Server.url}/addProduct`, data)
      .then((res) => {
        //console.log(res);
        if (res.data.error) {
          Alert.alert(res.data.error);
          return;
        }

        this.props.navigation.navigate('main');
        return;
      })
      .catch((error) => {
        this.handleError(error);
      });
  }
  render() {
    return (
      <SafeAreaConsumer>
        {(insets) => (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              paddingHorizontal: '5%',
              //paddingTop: insets.top,
            }}>
            <StatusBar backgroundColor="white" barStyle={'dark-content'} />
            <View style={{flex: 1, paddingTop: insets.top}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingTop: 20,
                }}>
                <View style={{flex: 2}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('main');
                    }}>
                    <MaterialIcons
                      name={'chevron-left'}
                      size={35}
                      color={'#A52745'}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{flex: 8}}>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    {'Add Product'}
                  </Text>
                </View>
              </View>
              <View style={{flex: 7, paddingHorizontal: '5%'}}>
                <View style={{flex: 1}}>
                  <KeyboardAwareScrollView>
                    <Input
                      placeholder="Product name"
                      onChangeText={(text) => {
                        this.setState({product_name: text});
                      }}
                      value={this.state.product_name}
                    />
                    <Input
                      placeholder="Product description"
                      onChangeText={(text) => {
                        this.setState({
                          product_description: text,
                        });
                      }}
                      value={this.state.product_description}
                    />
                    <Input
                      placeholder="Product barcodenumber"
                      containerStyle={{marginTop: 20}}
                      onChangeText={(text) => {
                        this.setState({
                          product_barcodenumber: text,
                        });
                      }}
                      value={this.state.product_barcodenumber}
                    />
                    <Input
                      placeholder="Product price"
                      onChangeText={(text) => {
                        this.setState({product_price: text});
                      }}
                      value={this.state.product_price}
                    />
                    <Input
                      placeholder="Product expiry date"
                      containerStyle={{marginTop: 20}}
                      errorStyle={{color: 'red'}}
                      onChangeText={(text) => {
                        this.setState({
                          product_expirydate: text,
                        });
                      }}
                      value={this.state.product_expirydate}
                    />
                    <Input
                      placeholder="Product image url from internet"
                      containerStyle={{marginTop: 20}}
                      errorStyle={{color: 'red'}}
                      onChangeText={(text) => {
                        this.setState({product_image: text});
                      }}
                      value={this.state.product_image}
                    />
                    <View style={{elevation: 4}}>
                      {this.state.product_image.length > 0 &&
                        this.showImage(this.state.product_image)}
                    </View>
                  </KeyboardAwareScrollView>
                </View>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingBottom: 30,
                }}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={this.addProduct.bind(this)}
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
                    {'SUBMIT '}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaConsumer>
    );
  }
}
