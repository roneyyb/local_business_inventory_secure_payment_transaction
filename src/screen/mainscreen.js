import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native'; 
import { connect} from 'react-redux';
import { clearAll } from '../actions/itemlistaction';
import Button from './components/button';

class Mainscreen extends Component {
    constructor(props) {
        super(props);
        props.clearAll();
    }

    makeabill= () => {
        this.props.navigation.navigate('qrcode');
    }

    addProduct = () => {
        this.props.navigation.navigate('addproduct')
    }
    render() {
        return (
            <View style={{ flex:1, backgroundColor: 'white', alignItems:'center', justifyContent:'center' }}>
                <Button
            buttonLabel={'Make a bill'}
            disabled={false}
            onPressaction={this.makeabill}
            style={{marginBottom:40, width:200}}
          />
               <Button
            buttonLabel={'Add a product'}
            disabled={false}
            onPressaction={this.addProduct}
            style={{ width:200}}
          />
             
                
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps,{clearAll})(Mainscreen);