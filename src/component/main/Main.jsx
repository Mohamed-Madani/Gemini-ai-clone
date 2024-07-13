
import React, { useContext } from 'react';
import './Main.css';
import { CircleUserRound, Compass, Brain, MessageCircle, Code, Image, Mic, Send, UserCircle2 } from 'lucide-react';
import { Context } from '../../context/Context';

const Main = () => {
  // Style pour les cartes
  const cardStyle = "h-48 p-4 rounded-lg relative cursor-pointer bg-[#f7f7f7] hover:bg-[#e2e2e2] transition-all duration-200";
  const cardIconStyle = "absolute p-1.5 bg-white rounded-full bottom-3 right-3 shadow";
  const loaderStyle = "rounded-md border-none bg-[#e2e2e2] bg-gradient-to-r from-cyan-500 to-blue-500 bg-[length:800px_50px] h-5";

  // Utilisation du contexte pour accéder aux états et fonctions définis dans ContextProvider
  const { onSent, showResult, loading, resultData, setInput, input, recentPrompt } = useContext(Context);

  return (
    <div className="main flex-1 h-screen pb-5 relative">
      {/* Barre de navigation */}

      <div className="nav flex items-center justify-between p-5 bg-[#f9f9fb] text-2xl font-semibold text-[#333] shadow-sm">
        <p>Gemini</p>
        <CircleUserRound className="nav-icon" size={24} strokeWidth={2} />
      </div>

      {/* Contenu principal */}
      <div className="main-container max-w-4xl mx-auto">
        {!showResult ? (
          <>
            <div className="greet my-10 text-5xl text-[#333] font-semibold p-5">
              <p>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  Hi, Dev
                </span>
              </p>
              <p>how can I help you today?</p>
            </div>

             {/* Cartes de suggestions */}
         <div className="cards grid gap-3 p-5">
           <div className={`card ${cardStyle}`}>
             <p className="text-base text-[#766e6e] ">Suggest some javascript frameworks</p>
             <Compass className={`card-icon ${cardIconStyle}`} size={35} strokeWidth={2} />
           </div>
           <div className={`card ${cardStyle}`}>
             <p className="text-base text-[#766e6e] ">Briefly explain the difference between React and Angular</p>
             <Brain className={`card-icon ${cardIconStyle}`} size={35} strokeWidth={2} />
           </div>


           <div className={`card ${cardStyle}`}>
             <p className="text-base text-[#766e6e] ">brainstorm a new idea for a web app</p>
             <MessageCircle className={`card-icon ${cardIconStyle}`} size={35} strokeWidth={2} />
           </div>
           <div className={`card ${cardStyle}`}>
             <p className="text-base text-[#766e6e] ">Improve the readability of the code</p>
             <Code className={`card-icon ${cardIconStyle}`} size={35} strokeWidth={2} />
           </div>
         </div>
         </> ) : ( <div className="result px-0 py-1 max-h-[70vh] overscroll-y-none ">
             <div className="result-title mx-10 my-10 flex items-center gap-4">
                 <UserCircle2 className="result-icon" size={20} strokeWidth={2} />
                 <p>{recentPrompt}</p>
             </div>
             <div className="result-data flex items-start gap-4">
                 <Code className="result-icon w-52 mt-1 " size={20} strokeWidth={2} />
                 {loading ? <div className='loader w-[100%] flex flex-col gap-2'>
                     <hr className={`loader-hr ${loaderStyle}`} />
                     <hr className={`loader-hr ${loaderStyle}`}/>
                     <hr className={`loader-hr ${loaderStyle}`}/>
                 </div> : <p dangerouslySetInnerHTML={{__html : resultData}} className="result-data-text text-base text-[#766e6e] font"></p>}
                
         </div>
         </div>
)}

        {/* Section de salutation */}

        {/* Barre de recherche et section de saisie */}
        <div className="main-bottom absolute bottom-0 w-full max-w-4xl px-5 py-5 mx-auto ">
          <div className="search-box flex items-center justify-between gap-4 bg-[#f7f7f7] px-4 py-3 rounded-full">
            <input
              onChange={(e) => setInput(e.target.value)} // Met à jour l'état 'input' avec la valeur saisie
              value={input} // Associe l'état 'input' à la valeur de l'input
              type="text"
              placeholder="Enter your question here..."
              className="input-search flex-1 border-none bg-transparent outline-none p-2 text-lg text-[#333]"
            />
            <div className="flex gap-2 items-center">
              <Image className="cursor-pointer text-[#666]" size={20} strokeWidth={2} />
              <Mic className="cursor-pointer text-[#666]" size={20} strokeWidth={2} />
              <Send
                onClick={() => onSent(input)} // Appelle la fonction 'onSent' du contexte lorsqu'on clique sur l'icône
                className="cursor-pointer text-[#666]"
                size={20}
                strokeWidth={2}
              />
            </div>
          </div>
          <p className="bottom-info text-sm mx-4 my-auto text-center text-[#999] font-light">
            Gemini is an AI assistant that helps you with your coding needs. It provides you with the best solutions and helps you improve your code quality.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;