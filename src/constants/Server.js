import Constants from 'expo-constants';
const { manifest } = Constants;

const url = `http://${manifest.debuggerHost
     .split(`:`)
     .shift()
     .concat(`:3000`)}`;

export default {
  mode: __DEV__,
  // Production Server
  // url : 'http://52.66.203.244:2112'
  // Staging Server
  url,
  // Personal Server
  // url : 'http://192.168.1.6:2112'
};
