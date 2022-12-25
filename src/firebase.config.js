import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBiYM3TowsxbaqJchxc-4O98e9Megxie4Y",
    authDomain: "multimart-react.firebaseapp.com",
    projectId: "multimart-react",
    storageBucket: "multimart-react.appspot.com",
    messagingSenderId: "1002237992858",
    appId: "1:1002237992858:web:2577c02ba8308e64aa2423"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app
