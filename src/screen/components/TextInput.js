import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

import Icons from 'react-native-feather1s';

export default class SignUpTextInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: this.props.error || ''
        }
    }

    getIcon = () => {
        const { error } = this.state;
        //console.log('Error:', error);
        if (error.length === 2) {
            return (
                <Icons
                    name={'check-circle'}
                    color={'green'}
                    size={25}
                />
            );
        } else if (error.length > 2) {
            return (
                <Icons
                    name={'x'}
                    color={'#A52745'}
                    size={25}
                />
            );

        } else {
            return (<View />);
        }
    };

    render() {
        return (
            <View style={styles.containerStyle}>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#222',
                        flex: 4,
                    }}>
                    <TextInput
                        style={[styles.textInputStyle]}
                        placeholder={this.props.placeholder}
                        autocorrect={this.props.autocorrect}
                        //selectionColor={'#FFA50033'}
                        selectionColor={this.props.selectionColor}
                        autoCompleteType={'off'}
                        returnKeyType={this.props.returnKeyType}
                        keyboardType={this.props.keyboardType}
                        clearButtonMode={'always'}
                        keyboardAppearance={'dark'}
                        secureTextEntry={false}
                        maxLength={this.props.maxLength}
                        onBlur={this.props.onBlur}
                        onChangeText={text => {
                            console.log('text =>', text);
                            this.props.onChangeText(text);
                        }}
                        value={this.props.value}
                        placeholderTextColor={
                            this.props.placeholderTextColor
                        }
                    />
                    {/* <View style={styles.buttonStyle}>
                        {
                            this.getIcon()
                        }
                    </View> */}
                </View>
                {this.state.error.length !== 2 && this.state.error.length > 0 ? (
                    <View
                        style={{
                            flex: 2,
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                color: 'red',
                                fontSize: 12,
                            }}>
                            {this.props.error}
                        </Text>
                    </View>
                ) : (
                        <View
                            style={{
                                flex: 2,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        />
                    )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        height: 60,
        // flex: 1,
        flexDirection: 'column',
    },
    textInputStyle: {
        flex: 8,
        height: 50,
        fontSize: 15,
        alignContent: 'center',
        alignItems: 'center',
        color: '#A52745',
    },
    buttonStyle: {
        flex: 2,
        height: 50,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
});
