import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../Services/firebase.config";

export const AuthContext = createContext(null);
export const UserContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Sign up user
  const signupWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Log in user
  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Sign up with Google
  const signupWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // Log out user
  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const authInfo = {
    currentUser,
    signupWithEmail,
    loginWithEmail,
    logout,
    signupWithGoogle,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      <UserContext.Provider value={{ userId, setUserId }}>
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <p className="text-lg">Loading...</p>
          </div>
        ) : (
          children
        )}
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};
