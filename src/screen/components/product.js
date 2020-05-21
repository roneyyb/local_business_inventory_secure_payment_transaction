import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default class Product extends Component {

    render() {
        const { product } = this.props;
        console.log('product =>',product);
        return (
          <View style={{ flex: 1 }}>
            <View style={styles.imageView}>
              <Image source={{ uri: product.image }}  style={{height:40,width:40}} />
            </View>
            <View style={styles.detailView}>
              <Text style={{ fontSize: 20 }}>{`${product.name}`}</Text>

              <Text
                style={{ fontSize: 10 }}
              >{`Product Description - ${product.desc}`}</Text>
              <Text
                style={{ fontSize: 10 }}
              >{`Product Price - ${product.price}`}</Text>
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    imageView: {
        borderRadius:2,
        borderColor:'#222',
        overflow:'hidden'  
    },
    detailView: {
        
    }
});