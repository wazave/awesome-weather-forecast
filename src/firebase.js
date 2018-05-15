import firebase from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyCDM__7rCCJQiJxNpuB21k_s8m1xE5Peec",
  authDomain: "awesome-weather-forecast.firebaseapp.com",
  databaseURL: "https://awesome-weather-forecast.firebaseio.com",
  projectId: "awesome-weather-forecast",
  storageBucket: "awesome-weather-forecast.appspot.com",
  messagingSenderId: "83403063822"
};

firebase.initializeApp(config);

export default firebase;
