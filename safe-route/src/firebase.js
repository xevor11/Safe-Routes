import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "@firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyB2GaZJ3HsfkNfh6_ZU6xg31_sqmYcU2xY",
  authDomain: "saferoute-a7113.firebaseapp.com",
  databaseURL: "https://saferoute-a7113-default-rtdb.firebaseio.com",
  projectId: "saferoute-a7113",
  storageBucket: "saferoute-a7113.appspot.com",
  messagingSenderId: "621092017455",
  appId: "1:621092017455:web:708ad82a62c57e41033dda",
  measurementId: "G-ZX6DMJ5FNM"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firestore = getFirestore(app);