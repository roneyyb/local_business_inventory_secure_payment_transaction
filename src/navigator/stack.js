import {
    createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Mainscreen from '../screen/mainscreen';
import Qrcode from '../screen/Qrcode';
import Item from '../screen/item';
import AddProduct from '../screen/addproduct';
import Paybill from '../screen/Paybill';
import Itemlist from '../screen/itemlist';
import Otp from '../screen/otp';
import Register from '../screen/register';
import reducer from '../reducer';

const stack = createStackNavigator({
    main: {
        screen:Mainscreen,
        navigationOptions: {
            header: () => null
        }
        },
    qrcode:{
        screen:Qrcode,
        navigationOptions: {
            header: () => null
        }
        },
    item: {
        screen: Item,
        navigationOptions: {
            header: () => null
        }
    },
    paybill: {
        screen: Paybill,
        navigationOptions: {
            header: () => null
        }
    },
    Otp: {
        screen: Otp,
        navigationOptions: {
            header: () =>null
        }
    },
    addproduct:{
        screen: AddProduct,
        navigationOptions: {
            header: () => null
        }
    },
    register: {
        screen: Register,
        navigationOptions: { header: () => null}
    },
    itemlist: {
        screen: Itemlist,
        navigationOptions: {
            header: () => null
        }
    }
},
{
    initialRouteName:'main'
});

const AppContainer = createAppContainer(stack);

export default AppContainer;