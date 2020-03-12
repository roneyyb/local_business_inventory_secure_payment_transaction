import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import TextInput from './otptextinput';

export default class Otptextinput extends Component {
    

    state = {
        v1:'',v2:'',v3:'',v4:'',v5:'',v6:'',vf:''
    }

    componentDidMount() {
        this.ti.focus();
    }
    render() 
    {
        return (
            <View style={styles.containerStyle}>
                <View style={styles.InsideContainer}>
                <TextInput autoFocus={true} ref={(child) => {this.ti=child;}} value={this.state.v1} onChange={(text) => {if(text.length===1){
                    this.setState({v1:text})
                    this.tinput.focus();}}}/>
                </View>
                 <View style={styles.InsideContainer}>
                <TextInput ref={(child2) => { this.tinput = child2; }}  value={this.state.v2} onChange={(text) => {if(text.length===1){
                    this.setState({v2:text})
                    this.ti3.focus();}}}/>
                </View>
                <View style={styles.InsideContainer}>
                <TextInput ref={child => this.ti3=child}  value={this.state.v3} onChange={(text) => {if(text.length===1){
                    this.setState({v3:text})
                    this.ti4.focus();}}}/>
                </View>
                <View style={styles.InsideContainer}>
                <TextInput ref={child => this.ti4=child}  value={this.state.v4} onChange={(text) => {if(text.length===1){
                    this.setState({v4:text})
                    this.ti5.focus();}}}/>
                </View>
                <View style={styles.InsideContainer}>
                <TextInput ref={child => this.ti5=child}  value={this.state.v5} onChange={(text) => {if(text.length===1){
                    this.setState({v5:text})
                    this.ti6.focus();}}}/>
                </View>
                <View style={styles.InsideContainer}>
                <TextInput ref={child => this.ti6=child}  value={this.state.v6} onChange={(text) => {if(text.length===1){
                    this.setState({v6:text, vf:''+this.state.v1+this.state.v2+this.state.v3+this.state.v4+this.state.v5+text})
                    }}}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection:'row',
        paddingRight:20,
        paddingLeft:20,
    },
    InsideContainer: {
        marginRight:5
    }
});