import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR, BACKGROUND_IMG } from '../utils/constants';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null)
    const dispatch = useDispatch()
    const name = useRef(null)
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = (e) => {
        const message = checkValidData(email.current.value, password.current.value, name?.current?.value)
        setErrorMessage(message)
        if (message) return
        // sign / sign up logic
        if (!isSignInForm) {
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value, photoURL: USER_AVATAR
                    }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser
                        dispatch(
                            addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL })
                        )
                        // ...
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message)
                        // ...
                    });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorMessage)
                    // ..
                });
        }

        else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(error.message)
                });
        }
    }
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div>
            <Header />
            <div className='absolute'>
                <img src={BACKGROUND_IMG} alt="logo" />
            </div>
            <form onSubmit={(e) => e.preventDefault()} action="" className=' w-4/12 absolute p-12 bg-black my-32 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && (<input ref={name} type="text" placeholder='Name' className='p-4 my-4 w-full bg-gray-700 rounded-lg' />)}
                <input type="text" placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700 rounded-lg' ref={email} />
                <input type="password" placeholder='Password' className='p-4 my-4 w-full bg-gray-700 rounded-lg' ref={password} />
                <p className='py-4 font-bold text-lg text-red-500'>{errorMessage}</p>
                <button className='p-4 my-6 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : "Sign Up"}</button>
                <p className='py-6 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix ? Sign up now' : 'Already registered ? Sign In now'}</p>
            </form>
        </div>
    )
}

export default Login
