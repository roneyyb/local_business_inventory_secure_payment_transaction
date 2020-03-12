import { createStore, applyMiddleware } from 'redux';
import {AsyncStorage} from 'react-native';
import ReduxThunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import reducers from '../reducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: [ 'itemlist', 'paybill' ]
};
const persistreducer = persistReducer(persistConfig, reducers);

const store = createStore(persistreducer, {}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);
//dont use capital letter here it causes error

export { persistor, store };
