import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  TextInput,
  StatusBar
} from 'react-native';
import Icons from 'react-native-vector-icons/MaterialIcons';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class Textinput extends Component {
  constructor(props) {
    super(props);
    this.state = { bordercolor: props.error.length>0?'red':'black', elevation: 0, borderWidth: 0 };
  }

  render() {
    return (
      <View>
      <View
        style={[
          styles.containerStyle,
          this.props.styles
        ]}
      >
        <View style={styles.textInputStyle}>
          <TextInput
            style={[styles.Textinputstyle, { borderBottomColor: 'white' }]}
            placeholder={this.props.placeholder}
            autocorrect={false}
            selectionColor={'#FFA50033'}
            autoCompleteType={'off'}
            clearButtonMode={'always'}
            keyboardAppearance={'dark'}
            secureTextEntry={false || this.props.secureTextEntry}
            
            onChangeText={text => {
              console.log('text =>', text);
              this.props.onChange(text);
            }}
            value={this.props.value}
            placeholderTextColor='grey'
          />
        </View>
        <View style={styles.buttonStyle}>
          {this.props.value.length > 0 ? (
            <TouchableWithoutFeedback
              onPress={() => {
                this.props.onChange('');
              }}
            >
              <Icons name={'clear'} color={this.props.error.length>0?'red':'green'} size={20} />
            </TouchableWithoutFeedback>
          ) : (
            <View />
          )}
        </View>
        </View>
        {this.props.error.length>0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: upadding/2
              }}
            >
        <Text style={{ color: 'red' , fontSize:upadding}}>{this.props.error}</Text>
            </View>
          ) : (
            <View />
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: upadding * 1.5,
    borderBottomWidth:0.5,
    borderBottomColor:'#A52745',
    height: upadding * 3.5,
    flexDirection: 'row'
  },
  Textinputstyle: {
    flex: 1,
    color: '#8D8D8C'
  },
  textInputStyle: {
    flex: 9,
    color: '#8D8D8C',

    paddingLeft: upadding
  },
  buttonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
