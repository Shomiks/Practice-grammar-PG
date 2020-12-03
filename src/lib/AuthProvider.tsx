import React, { createContext, FC, useEffect, useState } from "react";
import { firebaseApp } from "lib/firebase";
import { User } from "firebase";

export const AuthContext = createContext<User | null | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged(user => setCurrentUser(user));
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
