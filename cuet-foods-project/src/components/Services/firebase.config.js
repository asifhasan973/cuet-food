// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBDr9R9tSUTlmr37IuoMU8xX6uFpVU1sJU",
  authDomain: "cuet-foods.firebaseapp.com",
  projectId: "cuet-foods",
  storageBucket: "cuet-foods.firebasestorage.app",
  messagingSenderId: "300550893485",
  appId: "1:300550893485:web:ad578615153fe23299bb24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
