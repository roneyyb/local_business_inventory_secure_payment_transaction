import * as React from 'react';
import {
  Text,
  Dimensions,
  View,
  StyleSheet,
  Button,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {SafeAreaConsumer} from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import Server from '../constants/Server';
import {Updatelist, clearAll} from '../actions/itemlistaction';
import Header from './components/header';
import Modal from './components/itemModal';
import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';
import {BarCodeScanner} from 'expo-barcode-scanner';

const STATUS_BAR_HEIGHT = Constants.statusBarHeight;
const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

class BarcodeScanner extends React.Component {
  state = {
    scanned: false,
    isLoading: false,
    showAlert: false,
    isVisible: false,
    title: '',
    message: '',
    product: {},
  };

  addToCart(quantity) {
    const item = {
      ...this.state.product,quantity
    };

    this.setState({isLoading: false, isVisible: false});
    console.log(item);
    this.props.Updatelist(
      item,
      parseInt(item.quantity) * parseInt(item.price),
    );
  }

  render() {
    const { scanned, showAlert, isLoading, isVisible, product, title, message } = this.state;
    return (
      // <SafeAreaConsumer>
      //   {(insets) => (\
      <Header
        headerTitle={'Barcode Scanner  '}
        rightIcon={true}
        screen={'itemlist'}
        navigation={this.props.navigation}>
        {isLoading?  <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator size={'large'} color={'#A52745'} />
          {/* {this.state.isVisible?
           <Text style={{color: '#A52745', fontSize: 16}}>
            {'Adding to Cart....'}
          </Text>:
          <Text style={{color: '#A52745', fontSize: 16}}>
            {'Fetching item details....'}
          </Text>} */}
         
        </View>:
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={{
              height: SCREEN_WIDTH * 1.4,
            }}
          />
        </View>}
        <Modal
          isVisible={this.state.isVisible}
          product={product}
          onDiscard={() => {
            this.setState({isLoading: false});
          }}
          onAdd={(quantity) => {
            this.addToCart(quantity);
          }}
        />
        <AwesomeAlert
          show={showAlert}
          title={title}
          style={{flex: 1}}
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
      </Header>
    );
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      isLoading: false,
    });
    //this.props.navigation.goBack();
  };

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
    this.setState({
      showAlert: true,
      title,
      message,
    });
  }

  fetchProductDetails = (barcodenumber) => {
    axios
      .get(`${Server.url}/getProduct/${barcodenumber}`)
      .then((response) => {
        let res = response.data;
        this.setState({
          product: res.product,
          isVisible: true,
        });
        return;
      })
      .catch((error) => {
        this.handleError(error);
      });
  };

  handleBarCodeScanned = ({type, data}) => {
    this.setState({isLoading: true});
    this.fetchProductDetails(data);
  };


}

const mapStateToProps = (state) => {
  return {
    totalprice: state.itemlist.total_price,
    itemlist: state.itemlist.items,
  };
};

export default connect(mapStateToProps, {
  Updatelist,
  clearAll,
})(BarcodeScanner);