import { createContext } from 'react';
import run from '../config/gemini';
import { useState } from 'react';

// Création du contexte pour partager les états et les fonctions à travers l'application
export const Context = createContext();

const ContextProvider = (props) => {
  // Définition des états nécessaires pour l'application
  const [input, setInput] = useState(''); // État pour stocker l'entrée de l'utilisateur
  const [recentPrompt, setRecentPrompt] = useState(''); // État pour stocker le dernier prompt
  const [prevPrompts, setPrevPrompts] = useState([]); // État pour stocker les prompts précédents
  const [showResult, setShowResult] = useState(false); // État pour gérer l'affichage des résultats
  const [loading, setLoading] = useState(false); // État pour gérer l'affichage du chargement
  const [resultData, setResultData] = useState(''); // État pour stocker les données de résultat

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () =>{
    setLoading(false);
    setShowResult(false);
  }
  
  //Fonction asynchrone appelée lors de l'envoi d'un prompt
  const onSent = async (prompt) => {
    setResultData(''); // Réinitialise le résultat
    setLoading(true); // Déclenche l'affichage de l'animation de chargement
    setShowResult(true); // Affiche la section des résultats
    
    
    // let response;
    // if (prompt !== input) {
    //   response = await run(prompt); // Appelle la fonction 'run' pour obtenir une réponse au prompt
    //   setRecentPrompt(prompt); // Stocke le prompt dans l'état 'recentPrompt'
    // } else {
    //   setPrevPrompts((prevPrompts) => [...prevPrompts, input]); // Ajoute le prompt à la liste des prompts précédents
    //   setRecentPrompt(input); // Stocke le prompt dans l'état 'recentPrompt'
    //   response = await run(input); // Appelle la fonction 'run' pour obtenir une réponse au prompt
    // }

    let response;
    if (prompt == undefined) {
        response = await run(input);
        setRecentPrompt(prompt)
    } else {
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input); // Stocke le prompt dans l'état 'recentPrompt'
        response = await run(input); // Appelle la fonction 'run' pour obtenir une réponse au prompt
    }

    // setRecentPrompt(input); // Stocke le prompt dans l'état 'recentPrompt'
    // setPrevPrompts(prev => [...prev, input]);
    // const response = await run(input); // Appelle la fonction 'run' pour obtenir une réponse au prompt
    
    
    
    
    
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
        if (i === 0 || i % 2 !== 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += '<br>' + responseArray[i];
        }
    }
    let newResponse2 = newResponse.split("*").join("<br>");
    let newResponseArray = newResponse2.split(" "); // Stocke la réponse dans l'état 'resultData'
    for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord+" ");
    }
    setLoading(false); // Arrête l'animation de chargement
    setInput(''); // Réinitialise l'entrée utilisateur
  };

  // Valeur du contexte qui sera partagée avec les composants enfants
  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    // Fournit le contexte à tous les composants enfants
    <Context.Provider value={contextValue}>
      {props.children}
    </Context.Provider>
  );
};

export default ContextProvider;
















// const onSent = async () => {
//     setResultData(''); // Réinitialise le résultat
//     setLoading(true); // Déclenche l'affichage de l'animation de chargement
//     setShowResult(true); // Affiche la section des résultats
//     setRecentPrompt(input); // Stocke le prompt dans l'état 'recentPrompt'
//     setPrevPrompts(prev => [...prev, input]);
//     const response = await run(input); // Appelle la fonction 'run' pour obtenir une réponse au prompt
//     let responseArray = response.split("**");
//     let newResponse = "";
//     for (let i = 0; i < responseArray.length; i++) {
//         if (i === 0 || i % 2 !== 1) {
//             newResponse += responseArray[i];
//         } else {
//             newResponse += '<br>' + responseArray[i];
//         }
//     }
//     let newResponse2 = newResponse.split("*").join("<br>");
//     let newResponseArray = newResponse2.split(" "); // Stocke la réponse dans l'état 'resultData'
//     for (let i = 0; i < newResponseArray.length; i++) {
//         const nextWord = newResponseArray[i];
//         delayPara(i, nextWord+" ");
//     }
//     setLoading(false); // Arrête l'animation de chargement
//     setInput(''); // Réinitialise l'entrée utilisateur
//   };

//   // Valeur du contexte qui sera partagée avec les composants enfants
//   const contextValue = {
//     prevPrompts,
//     setPrevPrompts,
//     onSent,
//     setRecentPrompt,
//     recentPrompt,
//     showResult,
//     loading,
//     resultData,
//     input,
//     setInput,
//   };

//   return (
//     // Fournit le contexte à tous les composants enfants
//     <Context.Provider value={contextValue}>
//       {props.children}
//     </Context.Provider>
//   );
// };

// export default ContextProvider;