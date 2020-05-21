import React, {Component} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default class ItemModal extends Component {
  state = {
    quantity: '',
  };
  render() {
    const {product} = this.props;
    console.log('modal =>', product);
    return (
      <Modal
        isVisible={this.props.isVisible}
        style={{alignItems: 'center'}}
        onBackdropPress={this.props.onBackdropPress}
        onBackdropPress={null}>
        <View style={styles.containerStyle}>
          <View style={{alignItems: 'center', marginBottom: 10}}>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: '#222'}}>
              {'About Item  '}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              overflow: 'hidden',
              borderWidth: 0.5,
              borderColor: 'black',
              width: deviceWidth * 0.6,
              height: deviceWidth * 0.6,
              alignSelf: 'center',
            }}>
            <Image source={{uri: product.image}} style={{flex: 1}} />
          </View>
          <View style={styles.container2Style}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#A52745',
                }}>{`${product.name}  `}</Text>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 24,
                }}>{`${product.desc}`}</Text>
              <Text style={{fontSize: 12}}>{`${product.price} rs`}</Text>
            </View>
            <TextInput
              value={this.state.quantity}
              placeholder={'Quantity'}
              placeholderTextColor={'black'}
              keyboardType={'numeric'}
              returnKeyType={'done'}
              autoFocus={true}
              onChangeText={(text) => {
                this.setState({quantity: text});
              }}
              style={styles.textInputStyle}
            />
            <View
              style={{
                flexDirection: 'row',
                marginTop: 20,
                justifyContent: 'space-evenly',
              }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={this.props.onDiscard}>
                <Text style={styles.textStyle}>{'Discard '}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  console.log(this.state.quantity);
                  this.props.onAdd(this.state.quantity);
                }}>
                <Text style={styles.textStyle}>{'Add to Bill'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

export const styles = StyleSheet.create({
  buttonStyle: {
    elevation: 2,
    backgroundColor: '#A52745',
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 6,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
  },
  containerStyle: {
    width: deviceWidth * 0.7,
    padding: deviceWidth * 0.05,
    backgroundColor: 'white',
    borderRadius: deviceWidth * 0.05,
    flexDirection: 'column',
  },
  container2Style: {
    //flex:1
  },
  textInputStyle: {
    borderBottomWidth: 0.5,
    borderColor: '#222',
    color: 'black',
    height: 30,
  },
});
