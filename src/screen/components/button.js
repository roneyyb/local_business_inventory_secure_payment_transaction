import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
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
      <TouchableWithoutFeedback
        style={{}}
        onPress={() => {
          this.props.onPressaction();
        }}
        disabled={this.props.disabled}
      >
        <View style={[styles.buttonContainerStyle, this.props.style]}>
          <Text style={styles.buttonLabelStyle}>{this.props.buttonLabel}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: upadding * 3,
    elevation: upadding / 4,
    borderRadius: upadding * 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#add8ec'
  },
  buttonLabelStyle: {
    fontSize: upadding * 1.5,
    color: 'black'
  }
});
