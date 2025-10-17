import { initializeApp } from "firebase/app";
import type { User } from "firebase/auth";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { defineNuxtPlugin, useRouter, navigateTo } from "#app";

const firebaseConfig = {
  apiKey: "AIzaSyAALsz0B4JMMHEodKgRC7UVIBFZegsN3KU",
  authDomain: "practice-92a2a.firebaseapp.com",
  projectId: "practice-92a2a",
  storageBucket: "practice-92a2a.firebasestorage.app",
  messagingSenderId: "681728893564",
  appId: "1:681728893564:web:82a7a786b83359ce139ff9",
  measurementId: "G-Y83919R5TF",
};

export default defineNuxtPlugin((nuxtApp) => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account",
  });

  const user = useState<User | null>("firebase-user", () => null);

  auth.onAuthStateChanged((newUser) => {
    user.value = newUser;
    if (newUser) {
      navigateTo("/");
    }
  });

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        navigateTo("/");
      }
      return { user: result.user, error: null };
    } catch (error: any) {
      if (error.code === "auth/popup-blocked") {
        try {
          await signInWithRedirect(auth, googleProvider);
          const result = await getRedirectResult(auth);
          if (result?.user) {
            navigateTo("/");
            return { user: result.user, error: null };
          }
        } catch (redirectError: any) {
          return { user: null, error: redirectError.message };
        }
      }
      return { user: null, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  };

  return {
    provide: {
      auth: {
        user,
        signInWithGoogle,
        signOut,
      },
    },
  };
});
