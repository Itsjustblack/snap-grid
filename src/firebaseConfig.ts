// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBCtaZV7-BtpM9HSQUFqn9suTz-D7XI9pE",
	authDomain: "image-gallery-d58c4.firebaseapp.com",
	projectId: "image-gallery-d58c4",
	storageBucket: "image-gallery-d58c4.appspot.com",
	messagingSenderId: "683722918534",
	appId: "1:683722918534:web:a56bdef869dc37ef931f07",
	measurementId: "G-SVV34J79L6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
