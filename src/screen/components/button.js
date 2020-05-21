import React, { Component } from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
      activeOpacity={0.9}
        style={[styles.buttonContainerStyle,this.props.style]}
        onPress={() => {
          this.props.onPressaction();
        }}
        disabled={this.props.disabled}
      >
          <Text style={styles.buttonLabelStyle}>{this.props.buttonLabel}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: upadding * 3,
    elevation: upadding / 4,
    borderRadius: upadding *0.2,
    padding:10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#A52745'
  },
  buttonLabelStyle: {
    fontSize: upadding *1.5,
    color: 'white',
    fontWeight:'bold'
  }
});
