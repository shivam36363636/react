import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyA4cxP_agERgOqTmiUrMH_ORCNbobwIzvI',
  authDomain: 'crwn-clothing-68de9.firebaseapp.com',
  projectId: 'crwn-clothing-68de9',
  storageBucket: 'crwn-clothing-68de9.appspot.com',
  messagingSenderId: '292773523643',
  appId: '1:292773523643:web:a8154632ca6f6088c0399e',
  measurementId: 'G-CP5W4NMSTS',
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
