
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth";
import { useEffect } from 'react';
export default function Header() {
  const [pageState, setPageState] = useState("Se Connceter");
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  
  useEffect(()=>{
   onAuthStateChanged(auth, (user) => {
      if(user){
        setPageState("profile");
    }else{
      setPageState("Se Connecter");
  }
   });
  },[auth]);

  function pathMatchRoute(route) {
    if (route === location.pathname) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] ${
                pathMatchRoute("/") ? "border-b-red-500 text-gray-900" : "border-b-transparent"
              } ${pathMatchRoute("/")}`}
              onClick={() => navigate("/")}
            >
              Accueil
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] ${
                pathMatchRoute("/offers") ? "border-b-red-500 text-gray-900" : "border-b-transparent" 
              } ${pathMatchRoute("/offers")}`}
              onClick={() => navigate("/offers")}
            >
              Offres
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] ${
                pathMatchRoute("/sign-in") || pathMatchRoute("/profile") ? "border-b-red-500 text-gray-900" : "border-b-transparent"
              } ${pathMatchRoute("/sign-in") || pathMatchRoute("/profile")} `}
              onClick={() => navigate("/profile")}
            >
             {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
