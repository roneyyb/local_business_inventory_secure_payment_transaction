import React, { Component } from "react";  
import { Platform, StyleSheet, View, Button, TextInput, } from "react-native";  
import { isConfigurationAvailable } from "expo/build/AR";

export default class App extends Component {  

    constructor(props) {
     super(props);
     this.state ={ autoFocus:false};
    }

    focus = () => {
        console.log('focusssed');
        this.self_ref.focus();
    }
  render() {
      console.log('rerender',this.state.autoFocus);  
return (  
<View style={styles.container}>  
<TextInput
           ref = {(child) =>  {this.self_ref = child;}}  
          placeholder={null}  
          //autoFocus={this.state.autoFocus}
          style={styles.TextInputStyle}
          value={this.props.value}
          onChangeText={(value) => {
           this.props.onChange(value);   
          }}   
        keyboardType={'numeric'} 
  />  
</View>  
);  
}  
}  

const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
},   
TextInputStyle: {  
    textAlign: 'center',  
    height: 40,
    width:40,  
    borderRadius: 2,  
    borderWidth: 2,  
    borderColor: 'black',  

}  
});