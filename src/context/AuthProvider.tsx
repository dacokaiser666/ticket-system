import { createContext, useEffect, useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser, // Importa User de Firebase Authentication
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Definir el tipo de usuario que incluye 'role' proveniente de Firestore
interface User extends FirebaseUser {
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  authLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Primero recuperamos el rol y los datos adicionales de Firestore
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        // Si el documento no existe, lo creamos con un rol predeterminado
        if (!userSnap.exists()) {
          await setDoc(userRef, { uid: currentUser.uid, email: currentUser.email, role: "cliente" });
        }

        // Obtenemos los datos del usuario de Firestore
        const userData = userSnap.data();

        // Combinamos los datos de Firebase Authentication y Firestore
        setUser({
          ...currentUser, // Datos de autenticación de Firebase
          role: userData?.role || "cliente", // Asignamos el 'role' desde Firestore
        });
      } else {
        setUser(null);
      }
      setAuthLoading(false); // Indicamos que la autenticación terminó
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const userRef = doc(db, "users", result.user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, { uid: result.user.uid, email: result.user.email, role: "cliente" });
    }

    setLoading(false);
  };

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
  };

  const registerWithEmail = async (email: string, password: string) => {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", result.user.uid), { uid: result.user.uid, email, role: "cliente" });
    setLoading(false);
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, authLoading, loginWithGoogle, loginWithEmail, registerWithEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
