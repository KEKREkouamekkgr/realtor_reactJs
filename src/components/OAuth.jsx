import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import React from 'react'
import {FcGoogle} from "react-icons/fc"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import {db} from"../firebase";

export default function OAuth() {
  const navigate = useNavigate();

  async function onGoogleClick(){
      try{
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const user = result.user
        console.log('montre moi le user Pour Google: '+JSON.stringify(user));

        //checker pour voir le resultat de resulat de user
        const docRef= doc(db,'users',user.uid); //La fonction doc() retourne une référence à ce document spécifique dans la base de données Firestore,
        // ce qui permet d'effectuer des opérations telles que la lecture, l'écriture, la mise à jour ou la suppression de données dans ce document.
        const docSnap = await getDoc(docRef);
        if(!docSnap.exists()){
           await setDoc(docRef, {
            name:  user.displayName,
            email: user.email,
            timestamp: serverTimestamp()
           })
        }
        navigate("/");
      }catch(error){
        toast.error("Impossible de vous connecter avec Google!");
        console.log('Montre l\'erreur: '+JSON.stringify(error));
      }
  }

  return (
    <>
      <button type="button" onClick={onGoogleClick}
      className='flex items-center justify-center w-full bg-red-500 text-white px-7 py-3 uppercase text-sm font-medium hover:bg-red-700 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transition duration-300 ease-in-out'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
        Continuer Avec un Compte Google
      </button>
    </>
  )
}
