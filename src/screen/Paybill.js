import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';

import { connect } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import * as LocalAuthentication from 'expo-local-authentication';
import { onUseridChange, onPasswordChange, onButtonPress, onReset } from '../actions/paybill';
import Textinput from './components/textinput';
import Button from './components/button';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);


class Paybill extends Component {
    
  // componentDidMount() {
  //   this.props.onReset();
  // }

     componentWillUnmount() {
      this.props.onReset();
     }
    onUseridChanges = (userid) => {
        this.props.onUseridChange(userid);
    }

    onPasswordChanges = (password) => {
        this.props.onPasswordChange(password);
    }

    onButtonPresss = () => {
      this.props.onButtonPress(this.props.userid,this.props.password);
    }
    
    scanFingerPrint = async () => {
        try {
          let results = await LocalAuthentication.authenticateAsync();
          if (results.success) {
            console.log('Fingerprint success');
            const url = `http://localhost:3000/otpgeneration`;
            fetch(url,{
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'                
              },
              body:JSON.stringify({
                check:1
              })
            }).then(res => res.json())
            .then(res => {
              this.props.navigation.navigate('Otp',{userid: res.userid});
            })
            .catch(error => {
              console.log('error while requesting otp =>',error);
            });
          
          }
        } catch (e) {
          console.log(e);
        }
      };
    

    loadingorbutton = () => {
        if (this.props.loading) {
          return (
            <View
              style={
                ([styles.ButtonContainerstyle],
                { marginTop: upadding, alignSelf: 'center' })
              }
            >
              <ActivityIndicator size='large' color='black' />
            </View>
          );
        }
        return (
          <Button
            buttonLabel={'Login'}
            disabled={this.props.show_fingerprint}
            onPressaction={this.onButtonPresss}
            style={{ marginTop: upadding }}
          />
        );
      };

    render() {
        return (
            <LinearGradient
              colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
              style={styles.linearGradient}
            >
              <View style={styles.insideContainer}>
                <LinearGradient
                  colors={['#ADD8E6', '#add8e6E6', '#add8e6CC']}
                  style={{ alignItems: 'center', justifyContent: 'center', flex: 4 }}
                >
                  <Text style={styles.titleStyle}>{'Bank'}</Text>
                </LinearGradient>
                <View style={{ padding: upadding, flex: 6 }}>
       
                  {this.props.error.length>0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: upadding/2,
                      paddingBottom: upadding/2,
                    }}
                  >
                    <Text style={{ color: 'red', fontSize:upadding * 1.5, fontFamily:'cursive' }}>{this.props.errors}</Text>
                  </View>
                ) : (
                  <View />
                )}
                  <View style={styles.Individualcontainerstyle}>
                    <Textinput
                      placeholder={'Userid'}
                      error={''}
                      value={this.props.userid}
                      onChange={this.onUseridChanges}
                    />
                  </View>
                  <View style={styles.Individualcontainerstyle}>
                    <Textinput
                      placeholder={'Password'}
                      value={this.props.password}
                      error={''}
                      onChange={this.onPasswordChanges}
                      secureTextEntry={true}
                    />
                  </View>
                  <View>{this.loadingorbutton()}</View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      marginTop: upadding * 2,
                      alignItems: 'center'
                    }}
                  >
                      {this.state.authenticated?<Text>{"Authentication Successful"}</Text>:<View/>}
                  </View> */}
                  {/* <View>
                    <Button
                      buttonLabel={'Signup'}
                      style={{ marginTop: upadding }}
                      onPressaction={this.onSignuppress}
                    />
                  </View> */}
                </View>
              </View>
              <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.show_fingerprint}
          onShow={this.scanFingerPrint}>
          <View style={styles.modal}>
            <View style={styles.innerContainer}>
                <Text>{'Please provide your fingerprint'}</Text>
              <Image
                style={{ width: 128, height: 128 }}
                source={require('./picture/fingerprint.png')}
              />
              <TouchableHighlight
                onPress={async () => {
                  LocalAuthentication.cancelAuthenticate();
                  this.props.onReset();
                  this.props.navigation.navigate('Item');
                }}>
                <Text style={{ color: 'red', fontSize: 16 }}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
            </LinearGradient>
          );
    }
}

const mapStateToProps = (state) => {
  console.log('state =>',state);
    return {
        userid: state.paybill.userid,
        password: state.paybill.password,
        loading: state.paybill.loading,
        show_fingerprint: state.paybill.show_fingerprint,
        error: state.paybill.error
    }
}
export default connect(mapStateToProps, {onPasswordChange,onUseridChange, onButtonPress,onReset})(Paybill);
const styles = StyleSheet.create({
    linearGradient: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
        flex: 1,
        marginTop: '90%',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      innerContainer: {
        marginTop: '30%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    insideContainer: {
      flexDirection: 'column',
  
      height: SCREEN_HEIGHT * 0.85,
      width: SCREEN_WIDTH * 0.9,
      borderRadius: upadding,
      backgroundColor: 'white',
      elevation: 5,
      marginTop: upadding * 2
    },
    textStyle: {
      color: 'black',
      fontFamily:'cursive',
      fontSize: upadding * 1.6
    },
    Individualcontainerstyle: {
      marginBottom: upadding
    },
    titleStyle: {
      fontSize: upadding * 3,
      fontWeight: 'bold',
      color: 'black',
      fontFamily:'cursive',
      marginBottom: upadding
    },
    inputStyle: {
      marginTop: upadding,
      height: upadding * 1.5,
      borderBottomColor: '#4B0082',
      borderRadius: upadding / 2,
      borderBottomWidth: upadding * 0.3,
      backgroundColor: 'white'
    },
    Viewstyle: {
      marginBottom: upadding / 4
    },
    Buttonstyle: {
      padding: upadding / 4
    }
  });
  