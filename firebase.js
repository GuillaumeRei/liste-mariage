// Import des fonctions Firebase
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBcXBbTP7ZeBg89nFIlzXXFjKJ7GPXHY_s",
  authDomain: "liste-mariage-fb652.firebaseapp.com",
  projectId: "liste-mariage-fb652",
  storageBucket: "liste-mariage-fb652.firebasestorage.app",
  messagingSenderId: "420533003834",
  appId: "1:420533003834:web:d20d4757599fa58d1df703"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de Firestore
export const db = getFirestore(app); 

// Export de l'app Firebase
export default app;

