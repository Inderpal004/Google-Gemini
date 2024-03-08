import React, { useContext, useState } from 'react';
import './Sidebar.css';
import {assets} from '../../assets/assets'; 
import { Context } from '../../Context/Context';

export default function Sidebar() {

    const [expanded,setExpanded] = useState(false);
    const {onSent,prevPrompt,setRecentPrompt,newChat} = useContext(Context);

    const loadPrompt = async(prompt)=>{
        setRecentPrompt(prompt);
       await onSent(prompt);
    }

    const handleSidebar = ()=>{
        setExpanded(prev => !prev)
    }

  return (
    <div className='sidebar'>
        <div className="top">
            <img onClick={handleSidebar} src={assets.menu_icon} alt="" className='menu'/>
            <div onClick={()=> newChat()} className="new-chat">
                <img src={assets.plus_icon} alt="" />
              {expanded?<p>New Chat</p>:null}  
            </div>

            {expanded ? <div className="recent">
                <p className='recent-title'>Recent</p>
                {
                    prevPrompt.map((item,index)=>{
                        return ( 
                            <div onClick={()=>loadPrompt(item)} className="recent-entry" key={index}>
                            <img src={assets.message_icon} alt="" />
                            <p>{item.slice(0,18)} ...</p>
                            </div>
                        )
                    })
                }
            </div> : null}
        </div>

        <div className="bottom">
            <div className="bottom-item recent-entry">
                <img src={assets.question_icon} alt="" />
                {expanded ? <p>Help</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.history_icon} alt="" />
               {expanded ?  <p>Activity</p> : null}
            </div>
            <div className="bottom-item recent-entry">
                <img src={assets.setting_icon} alt="" />
               {expanded ?  <p>Settings</p> : null}
            </div>
        </div>
    </div>
  )
}
