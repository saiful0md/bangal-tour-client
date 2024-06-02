import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from "react";
import { app } from '../firebase/firebase.config';
// import useAxiosPublic from '../hooks/useAxiosPublic';
export const AuthContext = createContext(null);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // const axiosPublic = useAxiosPublic()
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignin = () => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo || "https://i.ibb.co/YcsgQSK/social-avatar-stories-gradient-frame-41737-3.jpg"
        })
    }
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            // if(currentUser){
            //     const userInfo = {
            //         email: currentUser.email
            //     }
            //     axiosPublic.post('/jwt', userInfo)
            //     .then(res=>{
            //         if(res.data.token){
            //             localStorage.setItem('access-token', res.data.token)
            //         }
            //     })
            // // }
            // else{localStorage.removeItem('access-token')}
            // setLoading(false);
        })
        return () => {
            return unsubscribe()
        }
    })
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        googleSignin,
        logOut,
        updateUserProfile
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;