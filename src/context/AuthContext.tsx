import {
  createContext,
  useContext,
  type ReactNode,
  useState,
  useEffect,
} from 'react';
import { type firebaseUser, onIdTokenChanged } from '../lib/firebase/firebase';

type User = firebaseUser | null;
type AuthContextState = { user: User };
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextState | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<firebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onIdTokenChanged((authUser) => {
      if (authUser) {
        setUser(() => {
          return authUser;
        });
      } else setUser(null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthUser = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};
