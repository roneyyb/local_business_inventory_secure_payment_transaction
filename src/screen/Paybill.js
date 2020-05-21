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
import Header from './components/header';
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
            const url = `http://192.168.43.24:3000/otpgeneration`;
            fetch(url,{
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body:JSON.stringify({
                check:1,
                userid:this.props.user_id
              })
            })
            .then(res => res.json())
            .then(res => {
              console.log(res);
              const userid= this.props.user_id;
              this.props.onReset();
              this.props.navigation.navigate('Otp',{userid});
            })
            .catch(error => {
              console.log('error while requesting otp =>',error);
            });
          
          } else {

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
            buttonLabel={'Pay '}
            disabled={this.props.show_fingerprint}
            onPressaction={this.onButtonPresss}
            style={{ marginTop: upadding*2, borderRadius:24 }}
          />
        );
      };

      onSignuppress = () => {
        this.props.navigation.navigate('register');
      }
    render() {
        return (
          //<LinearGradient
          //  colors={['#A52745', '#A5274566', '#A52745CC']}
          <Header type={'login'} navigation={this.props.navigation}>
            <View style={styles.linearGradient}>
              <View style={styles.insideContainer}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 4,
                  }}>
                  <Text style={styles.titleStyle}>{'Bank  '}</Text>
                </View>
                <View style={{padding: upadding, flex: 6}}>
                  {this.props.error.length > 0 ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: upadding / 2,
                        paddingBottom: upadding / 2,
                      }}>
                      <Text style={{color: 'red', fontSize: upadding * 1.2}}>
                        {this.props.error}
                      </Text>
                    </View>
                  ) : (
                    <View />
                  )}
                  <View style={styles.Individualcontainerstyle}>
                    <Textinput
                      placeholder={'Userid'}
                      error={''}
                      secureTextEntry={true}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: upadding * 2,
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flex: 2,
                        height: 0,
                        color: 'black',
                        borderWidth: 0.5,
                      }}
                    />
                    <View
                      style={{
                        flex: 4,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: upadding * 1.2, color: 'black'}}>
                        {'unregistered user ?'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        height: 0,
                        color: 'black',
                        borderWidth: 0.5,
                      }}
                    />
                  </View>
                  <View>
                    <Button
                      buttonLabel={'Register to bank  '}
                      style={{marginTop: upadding, borderRadius: 24}}
                      onPressaction={this.onSignuppress}
                    />
                  </View>
                </View>
                <Modal
                  animationType="slide"
                  visible={this.props.show_fingerprint}
                  onShow={this.scanFingerPrint}>
                  <View style={styles.modal}>
                    <View style={styles.innerContainer}>
                      <Text>{'Please provide your fingerprint'}</Text>
                      <Image
                        style={{width: 128, height: 128}}
                        source={require('./picture/fingerprint.png')}
                      />
                      <TouchableHighlight
                        onPress={async () => {
                          LocalAuthentication.cancelAuthenticate();
                          this.props.onReset();
                          this.props.navigation.navigate('itemlist');
                        }}>
                        <Text style={{color: 'red', fontSize: 16}}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </Header>
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
        error: state.paybill.error,
        user_id:state.paybill.user_id
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
      marginTop: upadding * 2
    },
    textStyle: {
      color: 'black',
      //fontFamily:'cursive',
      fontSize: upadding * 1.6
    },
    Individualcontainerstyle: {
      marginBottom: upadding
    },
    titleStyle: {
      fontSize: upadding * 3,
      fontWeight: 'bold',
      color: 'black',
      //fontFamily:'',
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
  