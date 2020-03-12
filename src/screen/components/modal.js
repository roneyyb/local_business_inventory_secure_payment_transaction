import React, { Component } from 'react';
import { Text, View, TouchableHighlight, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

const SCREEN_WIDTH = Dimensions.get('window').width;
const upadding = Math.round(SCREEN_WIDTH * 0.03);

export default class DeleteModal extends Component {
  render() {
    return (
      <View>
      <Modal
        isVisible={this.props.visibleornot === 1}
        style={{ justifyContent: 'center', borderRadius: 20 }}
      >
        <View
          style={{
            height: upadding * 14,
            padding: upadding,
            width: SCREEN_WIDTH - upadding * 3,
            borderRadius: upadding,
            backgroundColor: 'white',
            elevation: upadding
          }}
        >
          <View>
            <Text style={{ fontSize: upadding * 1.5, fontWeight: 'bold' }}>
              {`${this.props.title}`}
            </Text>
            <Text
              style={{
                fontSize: upadding,
                fontWeight: '600',
                color: '#8D8D8C',
                marginTop: upadding
              }}
            >
             {`${this.props.message}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: upadding * 3,
              justifyContent: 'flex-end'
            }}
          >
            <View style={{ paddingRight: upadding * 1.5 }}>
              <TouchableHighlight
                underlayColor={'#2B65EC33'}
                style={{
                  height: upadding *3,
                  width: upadding * 5,
                  borderRadius: upadding,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onPress={() => {
                    this.props.actiononbuttonpress();
                }}
              >
                <Text style={{ fontSize: upadding * 1.2, color:'#2B65EC', fontWeight:'bold' }}>
                  {`${this.props.Leftbuttontitle} `}
                </Text>
              </TouchableHighlight>
            </View>
            {/* <TouchableHighlight
              underlayColor={'#2B65EC33'}
              style={{
                height: upadding *3,
                  width: upadding * 5,
                  borderRadius: upadding,
                  alignItems: 'center',
                  justifyContent: 'center'
              }}
              onPress={() => {
                this.props.cancelFunction(false);
              }}
            >
              <Text style={{ fontSize: upadding * 1.2 , color: '#2B65EC', fontWeight:'bold' }}>{`${this.props.Rightbuttontitle} `}</Text>
            </TouchableHighlight> */}
          </View>
        </View>
      </Modal>
      </View>
    );
  }
}
