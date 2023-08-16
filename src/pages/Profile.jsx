import React from 'react';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import {Link, useNavigate} from "react-router-dom";
import {toast } from "react-toastify";
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import {db} from"../firebase";
import {FcHome} from "react-icons/fc";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const[changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    nom:auth.currentUser.displayName,
    email:auth.currentUser.email
  });
  const {nom, email} = formData;

  function onLogout(){
      auth.signOut();
      toast.success("Déconnecté avec succès! ");
      //fais la redirection
      navigate('/');
  }

  function onChange(e){
    setFormData((prevState)=>({
      ...prevState, 
     //[e.target.id]  faire référence au Id des champs du formulaire
     [e.target.id] : e.target.value,
    }))
  }

 async function onSubmit(){
      try {
        if(auth.currentUser.displayName !== nom){
          //Faire une mise à jour dans firebase
          await updateProfile(auth.currentUser, {
            displayName:nom,
        
          });
          //Faire la Modification
          const docRef = doc(db,"users", auth.currentUser.uid);
          await updateDoc(docRef, {
            nom:nom,
            timestamp: serverTimestamp()
          })
        }
        toast.success('Mise à jour éffectuer avec succès!');
        navigate('/profile');

      } catch (error) {
        toast.error("N'a pas réussi à mettre à jour vos informations");
      }
  }

  return (
    <>
    <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className='text-3xl text-center mt-6 font-bold'>Mon Profil</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
          <input type="text" id="name" value={nom} disabled={!changeDetail} onChange={onChange} className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200"}`} />
          <input type="email" id="email" value={email} disabled={!changeDetail} onChange={onChange} className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out" />
         
         <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6'>
            <p className="flex items-center">Voulez-vous changez votre nom ? <span onClick={()=> {changeDetail && onSubmit(); setChangeDetail((prevState)=>!prevState)}} className='text-red-600 hover:text-red-800 transition ease-in-out duration-300 ml-1 cursor-pointer'>{changeDetail ? "Appliquer les changements" : "Editer"}</span></p>
            <p onClick={onLogout} className='text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer'>Se Déconnecter</p>
         </div>
          </form>
          <button type="submit" className="w-full bg-blue-600 text-white uppercase px-7 py-3 text-sm font-medium rounded shadow-md hover:bg-blue-800 transition duration-300 ease-in-out hover:shadow-lg active:bg-blue-900">
            <Link to="/create-listing" className='flex justify-center items-center'>
              <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
                vendre ou louer votre maison
            </Link>
           
          </button> 
        </div>
    </section>
    </>
  )
}
