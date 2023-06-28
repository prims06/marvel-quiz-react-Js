import {initializeApp} from 'firebase/app'
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyD5YWMF1QDt9D9_gj5-b87G-EuXBiKRbHQ",
    authDomain: "marvel-quiz-cb1e2.firebaseapp.com",
    projectId: "marvel-quiz-cb1e2",
    storageBucket: "marvel-quiz-cb1e2.appspot.com",
    messagingSenderId: "426121772311",
    appId: "1:426121772311:web:99088198d2b8da5ad9cb52",
    measurementId: "G-YLVW4MJQ9M"
  };

class Firebase {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.auth = getAuth(); 
        this.db = getFirestore()
       
    }

    signUp = (email, password)=>
        createUserWithEmailAndPassword(this.auth,email, password).catch((err)=>{
            throw new Error(err)
        })
    
    signIn=(email, password)=>
        signInWithEmailAndPassword(this.auth,email, password).catch((err)=>{
            throw new Error(err)
        });
    

    signout=()=>{
        this.auth.signOut().catch((err)=>{
            throw new Error(err)
        })
    }
    getAuthentification=()=>{
        return this.auth
    }
    resetPassword=(email)=>sendPasswordResetEmail(this.auth, email).catch((err)=>{
        throw new Error(err)
    })

    user = (uid,pseudo, email)=>setDoc(doc(this.db,`users/${uid}`), {pseudo, email}).catch((err)=>{
        throw new Error(err)
    });

    getUser = uid=> getDoc(doc(this.db,`users/${uid}`))

} 


export default Firebase;