
import React from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const provider = new GoogleAuthProvider();

const AuthControl = () => {
  const user = auth.currentUser;

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return user ? (
    <div>
      <p>Welcome, {user.displayName}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <button onClick={handleLogin}>Login with Google</button>
  );
};

export default AuthControl;
