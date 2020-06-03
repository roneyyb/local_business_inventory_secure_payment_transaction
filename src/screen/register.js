import React from 'react';
import {
  Text,
  View,
  KeyboardAvoidingView,
  Dimensions,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import Header from './components/header';
import { LinearGradient } from 'expo-linear-gradient';
import Textinput from './components/textinput';
import Button from './components/button';
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const upadding = Math.round(SCREEN_WIDTH * 0.03);


export default class SignUp extends React.Component {
  static navigationOptions = () => ({
    headerTitle: () => {
      <Text
        style={{
          fontSize: 25,
          fontWeight: '400',
          color: 'black',
          paddingLeft: Math.round(Dimensions.get('window').width) / 2 - 120
        }}
      >
        {'Signup'}
      </Text>
    },
    headerStyle: {
      backgroundColor: 'white',
      borderBottomColor: '#202020'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200'
    }
  });
  constructor(props) {
    super(props);
    this.state = {username:'',email:'',userid:'',password:'',confirmpassword:'',number:'',balance:'',error:'',error1:'',error2:'',loading:false};
  }

//   shouldComponentUpdate(nextProps) {
//     if (nextProps.signup) {
//       this.props.navigation.navigate('settingupdatabase');
//       return false;
//     }
//     return true;
//   }

  onChangeemails(email) {
      this.setState({email});
  }
  onChangepasswords(password) {
    this.setState({password});
  }
  onChangeconfirmpasswords(confirmpassword) {
         if(confirmpassword!==this.state.password) {
             this.setState({confirmpassword,error1:'Password do not match'});
   } else {
       this.setState({confirmpassword, error1:''});
   }
  }
  onChangeusernames(username) {
      this.setState({username});
    }

    onChangeuserids(userid) {
        this.setState({userid});
    }

    onChangebalances(balance) {
        this.setState({balance});
    }

  onChangenumbers(number) {
      if(number.length>=2) {
          if(number[0]!=='9' && number[1]!=='1') {
              this.setState({error2:'Please include 91 before number',number});
          } else {
              this.setState({error2:'',number});
          }
      } else {
      this.setState({number,error2:''});
      }
  }

  onSignup = (user) => {
      this.setState({loading:true});
    const url = `http://192.168.43.24:3000/bankdetail`;
    fetch(url,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(user)
    })
    .then(res => res.json())
    .then(res => {
      if(res.success) {
          this.props.navigation.navigate('paybill');
      } else {
          this.setState({error:'Check your credentials'});
      }
    })
    .catch(error => {
      console.log('error while requesting otp =>',error);
    });
  }
  onSignups() {
    const user = {
      email: this.state.email,
      password: this.state.password,
      username: this.state.username,
     userid: this.state.userid,
     number: this.state.number,
     balance: this.state.balance
    };
    this.onSignup(user);
  }

  iferror(error) {
    if (error.length > 0) {
      return 'red';
    }
    return 'white';
  }

  loadingorbutton() {
    if (this.state.loading) {
      return (
        <View style={styles.ButtonContainerstyle}>
          <ActivityIndicator size='large' color='black' />
        </View>
      );
    }
    return (
      <Button
        buttonLabel={'Signup '}
        style={{ marginTop: upadding*2, borderRadius:24 }}
        onPressaction={this.onSignups.bind(this)}
      />
    );
  }
  render() {
    return (
      <Header type={'login'} navigation={this.props.navigation}>
        <View style={styles.linearGradient}>
          <KeyboardAvoidingView behavior="padding">
            <View style={styles.insideContainer}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 4,
                }}>
                <Text style={styles.titleStyle}>{'REGISTER TO BANK '}</Text>
              </View>
              <View style={{padding: upadding, flex: 8}}>
                {this.state.error.length > 0 ? (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop: upadding / 2,
                      paddingBottom: upadding / 2,
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: upadding * 1.2,
                        fontWeight: '400',
                      }}>
                      {this.state.error}
                    </Text>
                  </View>
                ) : (
                  <View />
                )}
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    placeholder={'username'}
                    error={''}
                    value={this.state.username}
                    onChange={this.onChangeusernames.bind(this)}
                    autocorrect={false}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangeemails.bind(this)}
                    placeholder="Email"
                    error={''}
                    autocorrect={false}
                    value={this.state.email}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangeuserids.bind(this)}
                    error={''}
                    placeholder="userid"
                    secureTextEntry={true}
                    autocorrect={false}
                    value={this.state.userid}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangepasswords.bind(this)}
                    error={''}
                    secureTextEntry={true}
                    autocorrect={false}
                    placeholder="password"
                    value={this.state.password}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangeconfirmpasswords.bind(this)}
                    error={this.state.error1}
                    secureTextEntry={true}
                    autocorrect={false}
                    placeholder="confirmpassword"
                    value={this.state.confirmpassword}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangenumbers.bind(this)}
                    error={this.state.error2}
                    secureTextEntry={false}
                    autocorrect={false}
                    placeholder="phone-number"
                    value={this.state.number}
                  />
                </View>
                <View style={styles.Individualcontainerstyle}>
                  <Textinput
                    onChange={this.onChangebalances.bind(this)}
                    error={''}
                    secureTextEntry={false}
                    autocorrect={false}
                    placeholder="account-balance"
                    value={this.state.balance}
                  />
                </View>
                <View>{this.loadingorbutton()}</View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: upadding * 3,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: upadding
  },
  linearGradient: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  Individualcontainerstyle: {
    marginBottom: upadding
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
    color: '#4B0082',
    fontSize: upadding * 1.5
  },
  titleStyle: {
    fontSize: upadding * 3,
    fontWeight: '600',
    color: 'black',
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
    marginBottom: 3
  },
  Buttonstyle: {
    padding: 3
  }
});
