import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore'
import { ref, onUnmounted } from 'vue'

const firebaseConfig = {
  apiKey: import.meta.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
}

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const usersCollection = collection(db, 'users')

export const createUser = (user) => addDoc(usersCollection, user)

export const getUser = async (id) => {
  const snap = await getDoc(doc(db, 'users', id))
  return snap.exists() ? snap.data() : null
}

export const updateUser = (id, user) => updateDoc(doc(db, 'users', id), user)

export const deleteUser = (id) => deleteDoc(doc(db, 'users', id))

export const useLoadUsers = ({ pageSize = 50 } = {}) => {
  const users = ref([])
  const q = query(usersCollection, orderBy('name'), limit(pageSize))
  const close = onSnapshot(q, (snapshot) => {
    users.value = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
  })
  onUnmounted(close)
  return users
}
