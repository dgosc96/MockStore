import { useEffect, useState } from 'react';
import { onAuthStateChanged, type firebaseUser } from './firebase';

export function useCurrentUser() {
  const [user, setUser] = useState<firebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      console.log('FIREBASE: onAuthStateChanged:' + authUser?.displayName);
      setUser(authUser);
    });
    return () => unsubscribe();
  }, []);

  return user;
}
