// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { ref, onUnmounted} from "vue";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA2IynnroNh-2GUlm9O-jB2-P7KSu8gOkE",
    authDomain: "personal-site-5bca5.firebaseapp.com",
    projectId: "personal-site-5bca5",
    storageBucket: "personal-site-5bca5.appspot.com",
    messagingSenderId: "284455794578",
    appId: "1:284455794578:web:57c466e29980d7cb0bb34b",
    measurementId: "G-QX0DDF2Z0V"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const usersCollection = db.collection('users');


export const createUser = user => {
    return usersCollection.add(user)
}

export const getUser = async id => {
    const user = await usersCollection.doc(id).get()
    return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
    return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
    return usersCollection.doc(id).deleteUser()
}

export const useLoadUsers = () => {
    const users = ref([])
    const close = usersCollection.onSnapshot(snapshot => {
        users.value = snapshot.doc.map(doc => ({ id: doc.id, ...doc.data() }))
    })
    onUnmounted(close)
    return users
}