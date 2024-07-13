// 

import { Menu, Plus, MessageSquareMore, CircleHelp, History, Settings2 } from "lucide-react";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";

function Sidebar() {
  const [extended, setExtended] = useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  }

  return (
    <div className="sidebar h-lvh flex flex-col justify-between bg-[#F7F9FB] py-8 px-6  rounded-lg">
      {/* Partie supérieure de la barre latérale */}
      <div className="top">
        <Menu
          className="menu block cursor-pointer text-gray-700"
          size={24}
          strokeWidth={2}
          onClick={() => setExtended((prev) => !prev)}
        />

        {/* Section pour démarrer un nouveau chat */}
        <div 
          onClick={() => newChat()}
          className="new-chat mt-8 flex items-center gap-4 py-3 px-5 bg-[#D0DFFF] rounded-full text-gray-800 cursor-pointer hover:bg-[#B0D0FF] transition"
        >
          <Plus className="plus" size={20} strokeWidth={2} />
          {extended && <p className="text-base font-semibold">New Chat</p>}
        </div>

        {/* Section des récents */}
        {extended ? (
          <div className="recent flex flex-col mt-5">
            <p className="recent-title font-semibold text-gray-700">Recent</p>
            {prevPrompts.map((item, index) => (
              <div
                onClick={() => loadPrompt(item)}
                key={index}
                className="recent-entry flex items-center gap-4 rounded-full p-3 cursor-pointer bg-[#FDFDFE] hover:bg-[#D0DFFF] transition"
              >
                <MessageSquareMore
                  className="recent-entry-icon text-gray-600"
                  size={20}
                  strokeWidth={2}
                />
                <p className="text-gray-800">{item.slice(0, 20)}...</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Partie inférieure de la barre latérale */}
      <div className="bottom flex flex-col">
        {/* Section aide */}
        <div className="bottom-item recent-entry flex items-center gap-4 mb-2 rounded-full p-3 cursor-pointer bg-[#FDFDFE] hover:bg-[#D0DFFF] transition">
          <CircleHelp className="bottom-item-icon text-gray-600" size={20} strokeWidth={2} />
          {extended && <p className="text-gray-800">Help</p>}
        </div>

        {/* Section activité */}
        <div className="bottom-item recent-entry flex items-center gap-4 mb-2 rounded-full p-3 cursor-pointer bg-[#FDFDFE] hover:bg-[#D0DFFF] transition">
          <History className="bottom-item-icon text-gray-600" size={20} strokeWidth={2} />
          {extended && <p className="text-gray-800">Activity</p>}
        </div>

        {/* Section paramètres */}
        <div className="bottom-item recent-entry flex items-center gap-4 rounded-full p-3 cursor-pointer bg-[#FDFDFE] hover:bg-[#D0DFFF] transition">
          <Settings2 className="bottom-item-icon text-gray-600" size={20} strokeWidth={2} />
          {extended && <p className="text-gray-800">Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
