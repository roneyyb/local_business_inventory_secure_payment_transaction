import React, {Component} from 'react';
import {
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import AwesomeAlert from 'react-native-awesome-alerts';
import Input from './components/TextInput';
import Header from './components/header';
import Button from './components/button';
import Server from '../constants/Server';
import Product from './components/product';
import Modal from './components/itemModal';
import axios from 'axios';

export default class ItemList extends Component {
  constructor(props) {
    super(props);
    this.barcodenumber = this.props.navigation.getParam('barcodenumber');
    this.state = {
      product: {},
      quantity: '',
      title: '',
      message: '',
      isLoading: true,
      showAlert: false,
    };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
    this.props.navigation.goBack();
  };

  componentWillUnmount() {
    console.log('item unmount');
  }
  onSubmit = () => {
    this.props.navigation.navigate('itemlist', {
      product: this.state.product,
      quantity: this.state.quantity,
    });
  };

  render() {
    const {product, showAlert, isLoading, title, message} = this.state;

    if (isLoading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#ffffff',
          }}>
          <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
          <ActivityIndicator size={'large'} color={'#A52745'} />
          <AwesomeAlert
            show={showAlert}
            title={title}
            message={message}
            closeOnTouchOutside={false}
            closeOnHardwareBackPress={false}
            showConfirmButton={true}
            confirmText="Scan, new item"
            confirmButtonColor="#A52745"
            onConfirmPressed={() => {
              this.hideAlert();
            }}
          />
        </View>
      );
    } else {
      console.log('product', this.state.product);
      return (
        <View>
          <Header headerTitle={'Item '} navigation={this.props.navigation} />
          <View>
            <Product product={this.state.product} />
            <Input
              labelstyle={{fontSize: 20, color: '#6666FF'}}
              placeholder="Product Quantity"
              label={'Enter product quantity'}
              onChangeText={(text) => {
                this.setState({quantity: text});
              }}
              value={this.state.quantity}
            />

            <Button
              buttonLabel={'Submit'}
              disabled={false}
              onPressaction={this.onSubmit}
              style={{marginTop: 40, width: 100}}
            />
          </View>
        </View>
      );
    }
  }

  handleError(error) {
    function isNetworkError(err) {
      return !!err.isAxiosError && !err.response;
    }

    let message;
    let title;
    if (isNetworkError(error)) {
      title = 'Network Error';
      message = 'Please try again.';
    } else {
      let responseJson = error.response.data;
      title = '';
      message = responseJson.message;
    }
    this.setState({showAlert: true, title, message});
  }

  fetchProductDetails = (barcodenumber) => {
    console.log(barcodenumber);
    axios
      .get(`${Server.url}/getProduct/${barcodenumber}`)
      .then((response) => {
        let res = response.data;
        console.log(res.product);
        this.setState({product: res.product, isLoading: false});
        return;
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  componentDidMount() {
    this.fetchProductDetails(this.barcodenumber);
  }
}
