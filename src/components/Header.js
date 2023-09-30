import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toogleGptSearchView } from '../utils/GptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(store => store.user)
  const showGptSearch = useSelector(store => store.gpt.showGptSearch)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
        navigate('/browse')
        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate('/')
        // ...
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe()
  }, [])

  const handleGptSearchClick = () => {
    dispatch(toogleGptSearchView())
  }

  const handleLangChange = (e) => {
    dispatch(changeLanguage(e.target.value))
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      navigate('/error')
      // An error happened.
    });
  }
  return (
    <div className='absolute w-screen py-2 bg-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44' src={LOGO} alt="netflix-logo" />
      {user && (<div className='flex p-2'>
        {showGptSearch &&
          <select className='p-2 bg-gray-900 text-white m-2' onChange={handleLangChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>
        }
        <button className='py-2 px-4 m-2 bg-purple-800 text-white rounded-lg' onClick={handleGptSearchClick}>{showGptSearch ? 'Home' : 'GPT Search'}</button>
        <img className='h-8 m-4' src={user?.photoURL} alt="userIcon" />
        <button onClick={handleSignOut} className='font-bold text-white'>Sign Out</button>
      </div>)}
    </div>
  )
}

export default Header