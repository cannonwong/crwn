import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3mZlLDwTJx0pLsdbTsGytuP_xojxOqZ8",
    authDomain: "crwn-clothing-db-64301.firebaseapp.com",
    projectId: "crwn-clothing-db-64301",
    storageBucket: "crwn-clothing-db-64301.appspot.com",
    messagingSenderId: "264804371927",
    appId: "1:264804371927:web:195630080d7272f2d60f92"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


//Start Authentication
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => {
    return signInWithPopup(auth, provider);
};

//Access Firestore Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef  = doc (db, 'users', userAuth.uid);
    console.log(userDocRef)

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

    //Check if user exists, if not set into database
    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt});
        }
        catch (error) {
            console.log("Error creating the user", error.message);
        }
    }

    //Else returns
    return userDocRef;
};