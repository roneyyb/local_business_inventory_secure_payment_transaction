import {SafeAreaConsumer} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import propTypes from 'prop-types';
import {Header} from 'react-native-elements';
import React from 'react';

export default class Headers extends React.Component {
  
  render() {
  const {rightIcon,screen,rightComponent,type} = this.props;
  console.log('rightComponent =>',rightComponent);
  if(type==='login' || type==='signup') {
    return (
      <SafeAreaConsumer>
        {(insets) => [
          <View
            style={{
              paddingTop: insets.top,
              flex: 1,
              backgroundColor: '#ffffff',
            }}>
            <Header
              placement={'left'}
              containerStyle={{
                //borderBottomWidth: 0.5,
                //borderBottomColor: '#aaa',
                height: 60,
                paddingTop: 3,
                paddingHorizontal: 20,
              }}
              backgroundColor={'#ffffff'}
              leftComponent={
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}>
                  <MaterialIcons
                    name={'chevron-left'}
                    size={35}
                    color={'#A52745'}
                  />
                </TouchableOpacity>
              }
            />
            {this.props.children}
          </View>,
        ]}
      </SafeAreaConsumer>
    );
  }
  return (
      <SafeAreaConsumer>
        {(insets) => (
          <View
            style={{
              paddingTop: insets.top,
              flex:1,
              backgroundColor: '#ffffff',
            }}>
            <StatusBar backgroundColor={'#ffffff'} barStyle={'dark-content'} />
            <Header
              placement={'left'}
              containerStyle={{
                borderBottomWidth: 0.5,
                borderBottomColor: '#aaa',
                height: 60,
                paddingTop: 3,
                paddingHorizontal: 20,
              }}
              backgroundColor={'#ffffff'}
              leftComponent={
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
              }
              centerComponent={
                <Text style={{fontSize: 20, fontWeight:'bold', color: '#A52745'}}>
                  {this.props.headerTitle}
                </Text>
              }
              rightComponent={
                rightIcon?
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate(screen);
                  }}>
                  <MaterialIcons
                    name={'shopping-cart'}
                    size={30}
                    color={'#A52745'}
                  />
                </TouchableOpacity>
                :this.props.rightComponent
              }
            
            />
            {this.props.children}
          </View>
        )}
      </SafeAreaConsumer>
    );
  }
}

// Headers.propTypes = {
//     navigation: propTypes.string.isRequired,
//     headerTitle: propTypes.string.isRequired
// }
