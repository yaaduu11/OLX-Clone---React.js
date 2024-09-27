import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDbE68Q9KL7_fUgzWDzgkO4knd7ggryVdY",
  authDomain: "olx-clone-7f057.firebaseapp.com",
  projectId: "olx-clone-7f057",
  storageBucket: "olx-clone-7f057.appspot.com",
  messagingSenderId: "471927441211",
  appId: "1:471927441211:web:8e3cd912de55ffef21591e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

googleProvider.setCustomParameters({
  prompt: "select_account" 
});

export const googleSignIn = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User signed in:", user);
  } catch (error) {
    console.error("Error during Google sign-in:", error);
  }
};