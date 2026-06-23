firebase.initializeApp({
  apiKey: 'AIzaSyAd176So-lY5IFJoeh0J08edWh4ytXmuTs',
  authDomain: 'dapblclub-hub.firebaseapp.com',
  projectId: 'dapblclub-hub',
  storageBucket: 'dapblclub-hub.firebasestorage.app',
  messagingSenderId: '1059697973377',
  appId: '1:1059697973377:web:223f9315410bd40a9b5580',
});

window._db = firebase.firestore();
window._storage = firebase.storage();
