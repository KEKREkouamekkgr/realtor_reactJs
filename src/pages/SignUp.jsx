import React, { useState } from 'react';
import {AiFillEyeInvisible, AiFillEye} from'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import {toast } from "react-toastify";
export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    nom:"",
    email:"",
    password:""
  });
  const navigate =useNavigate();
  const {nom,email,password} =  formData; // est un objet contenant email et password;
  //Ensuite, le code utilise la syntaxe de décomposition ({email, password} = formData)
  // pour extraire les propriétés email et password de l'objet formData. 
  //Cela permet d'accéder directement à ces propriétés sans avoir à écrire formData.email ou formData.password.
  function onChange(e){
    // console.log(e.target.value);
    setFormData((prevState)=>({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

 async function onSubmit(e){
      e.preventDefault();
      try {
        const auth = getAuth();
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        updateProfile(auth.currentUser, { 
          //updateProfile(auth.currentUser, { displayName: nom }): 
          //Cette ligne met à jour le profil de l'utilisateur nouvellement créé en lui donnant un nom d'affichage (displayName).
          displayName:nom
        })
        const user = userCredential.user
        console.log('informations du user: '+JSON.stringify(user));
        const formDataCopy = {...formData}
        delete formDataCopy.password
        formDataCopy.timestamp = serverTimestamp();
        console.log('Voir l\'intérieur de formDataCopy: '+ JSON.stringify(formDataCopy));
       await setDoc(doc(db,"users", user.uid), formDataCopy);
       toast.success("L'inscription a été un succès! ");
       //fais la redirection
       navigate('/');
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error("Houps!, une erreur est survenue! ")
        console.log('Informations du user:  errorCode: '+JSON.stringify(errorCode)+' errorMessage: '+JSON.stringify(errorMessage));

      }
  }

  return (
    <>
    <section>
      <h1 className='text-3xl text-center mt-6 font-bold'>Inscription</h1>
      <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
        <div className="md:w-[65%] lg:w-[50%] mb-12 md:mb-6">
          <img src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80" alt="key" className='w-full rounded-3xl' />
        </div>
        <div className="w-full md:w-[65%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input type='text' id="nom" className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' value={nom} onChange={onChange} placeholder='Entrer votre nom complet' />
          <input type='email' id="email" className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' value={email} onChange={onChange} placeholder='Entrer votre email' />
          
          <div className='relative mb-6'>
          <input type={showPassword ? "text":"password"} id="password" className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' value={password} onChange={onChange} placeholder='Entrer votre mot de passe' />
          {showPassword ? (<AiFillEyeInvisible className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=> setShowPassword((prevState) => !prevState)} />) : (<AiFillEye  className='absolute right-3 top-3 text-xl cursor-pointer' onClick={()=> setShowPassword((prevState) => !prevState)}  />) }
          </div>
          <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
            <p className='mb-6'>J'ai déjà un compte!
              <Link to="/sign-in" className='text-red-600 hover:text-red-800 transition duration-300 ease-in-out ml-1'>Se connecter</Link>
            </p>
            <p className=''>
              <Link to="/forgot-password" className='text-blue-600 hover:text-red-800 transition duration-300 ease-in-out ml-1'>Mot de passe oublié?</Link>
            </p>
          </div>
          <button type="submit" className='w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-800 transition duration-300 ease-in-out hover:shadow-lg active:bg-blue-800'>S'inscrire</button>
          <div className='flex items-center my-4 before:border-t before:flex-1  before:border-gray-500 after:border-t after:flex-1 after:border-gray-500'>
             <p className='text-center font-semibold mx-4'>OU</p>
          </div>
              <OAuth />
          </form>
          </div>
      </div>
    </section>
    </>
  )
}

