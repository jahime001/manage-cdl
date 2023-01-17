import { createContext, useContext, useEffect, useState } from "react"
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase"
const UserContext = createContext()
const RefreshContext = createContext()
const RefreshUpdateContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [pending, setPending] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth,email,password)
    }
const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth,email,password)
    }

    const logout = () => {
        return signOut(auth)
    }
    useEffect(() => {
            const unsub = onAuthStateChanged(auth, (currentUser) => {
                console.log(user)
                setUser(currentUser)
                setPending(false)
            })
            return () => {
                unsub()
            }
    }, [])

    const handleRefresh = () => {
        setRefresh(!refresh)
    }

    if (pending) {
        return <>Loading...</>
    }
    return (
      <UserContext.Provider
        value={{ createUser, user, logout, signIn, refresh }}
      >
        <RefreshUpdateContext.Provider value={handleRefresh}>
          {children}
        </RefreshUpdateContext.Provider>
      </UserContext.Provider>
    );
}

export const UserAuth = () => {
    return useContext(UserContext)
}

export const RefreshUpdate = () => {
  return useContext(RefreshUpdateContext);
};

