import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyDQGJKCCNAnWgNZRwAhOw3SAEYdOXZvs2g",
    authDomain: "chess-7b45b.firebaseapp.com",
    databaseURL: "https://chess-7b45b.firebaseio.com",
    projectId: "chess-7b45b",
    storageBucket: "chess-7b45b.appspot.com",
    messagingSenderId: "939006956917"
};

export const firebaseImpl = firebase.initializeApp(config);
export const firebaseDatabase = firebase.firestore();