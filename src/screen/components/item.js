import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';

import {styles} from '../components/itemModal';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default function renderItems(props) {
    console.log(props);
    const [quantity,setQuantity] = useState(props.item.quantity);
    const  { item } = props;

    return (
    <View style={{flexDirection:'row', backgroundColor:'white',padding:10, borderBottomWidth:0.5,borderBottomColor:'#222',width:deviceWidth,justifyContent:'space-around'}}>
      
      <View
        style={{
          borderRadius: 10,
          overflow: 'hidden',
          borderWidth: 0.5,
          borderColor: 'black',
          width: deviceWidth * 0.4,
          height: deviceWidth * 0.4,
          alignSelf: 'center',
        }}>
        <Image source={{uri: item.image}} style={{flex: 1}} />
      </View>
      <View style={styles.container2Style}>
        <View style={{}}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#A52745',
            }}>{`${item.name}  `}</Text>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
            }}>{`${item.desc}`}</Text>
          <Text style={{fontSize: 16}}>{`${item.price} rs`}</Text>
        </View>
        <TextInput
          value={quantity}
          placeholder={'Quantity'}
          placeholderTextColor={'black'}
          keyboardType={'numeric'}
          returnKeyType={'done'}
          onChangeText={(text) => {
              setQuantity(quantity)
          }}
          style={styles.textInputStyle}
        />
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            style={[styles.buttonStyle,{backgroundColor:'silver'}]}
           // onPress={this.props.onDiscard}
           >
            <Text style={[styles.textStyle,{color:'black'}]}>{'Remove '}</Text>
          </TouchableOpacity>
           <TouchableOpacity
            style={styles.buttonStyle}
            // onPress={() => {
            //   console.log(this.state.quantity);
            //   this.props.onAdd(this.state.quantity);
            // }}
            >
            <Text style={styles.textStyle}>{'Update '}</Text>
          </TouchableOpacity> 
        </View> */}
      </View>
    </View>
  );
}
