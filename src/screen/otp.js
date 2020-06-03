import React, { Component } from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import Button from './components/button';
import Textinput from './components/otpfulltextinput';
import Modal from './components/modal';
import {clearAll } from '../actions/itemlistaction';
import { connect } from 'react-redux';

class Otp extends Component {
    
    constructor(props) {
        super(props);
        this.state = {userid:props.navigation.getParam('userid','123'), loading:false, message:'', visibleWorkModal:0, auth:false};
    }

    onSubmitotp = () => {
        let otp = this.otpf.state.vf;
        if(otp.length==6) {
            console.log(otp);
            const url = `http://192.168.43.24:3000/otpgeneration`;
            this.setState({loading:true})
            fetch(url,{
                method:'POST',
                headers:{
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify({
                    check:2,
                    userid: this.state.userid,
                    otp: otp,
                    amount:this.props.amount
                })
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                if(res.success) {
                    this.setState({message:res.message, visibleWorkModal:1, auth:true});
                } else {
                    this.setState({message:res.message, visibleWorkModal:1,auth:false});
                }
            });
        }
    }
    loadingorbutton = () => {
        if (this.state.loading) {
          return (
            <View
            style={{ width:100, marginTop:200}}
            >
              <BallIndicator size={30} color='black' />
            </View>
          );
        }
        return (
            <Button onPressaction={this.onSubmitotp} disabled={false} buttonLabel={'Submit '} style={{ width:100, marginTop:200}}/>
        );
      };

      takeaction = () => {
          this.props.clearAll();
          if(this.state.auth) {
              this.setState({visibleWorkModal:0});
              this.props.navigation.navigate('main');
          } else {
              this.setState({visibleWorkModal:0});
              this.props.navigation.navigate('main');
          }
      }

    render() {
        return (
            <View style={styles.Container}>
                <View style={styles.Container1}>
                   <Text style={[styles.Textstyle,{marginBottom:0}]}> 
                        {'   Enter Otp  '}
                    </Text>
                </View>               
                <View style={styles.Container2}>
                    <Textinput ref={child => {this.otpf = child}}/>
                    {this.loadingorbutton()}
                </View>
                        <Modal
                        visibleornot={this.state.visibleWorkModal}
                        actiononbuttonpress={this.takeaction}
                        title={'Thank you for using our bank'}
                        message= {this.state.message}
                        Leftbuttontitle={'Ok'}
                        />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        amount: state.itemlist.total_price
    }
};


export default connect(mapStateToProps,{clearAll})(Otp);

const styles = StyleSheet.create({
    Container: {
        flex:1,
        flexDirection:'column'
    },
    Container1: {
        flex:2,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#A52745'
    },
    Textstyle: {
        fontSize:20,
        color:'black',
        fontWeight:'bold',
    },
    Container2: {
        flex:8,
        alignItems:'flex-start',
        justifyContent:'flex-start',
        alignItems:'center'
    }
});