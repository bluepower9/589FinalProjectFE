import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import { isAuthenticated } from "../../util/Authentication";



function NavBar(props){
    // const [loginStatus, updateLoginStatus] = useState(null);
    const [usermenu, updateusernmenu] = useState(false);
    let userButton;

    const user = (isAuthenticated())?localStorage.getItem('username'): null;

    // changes sign in to profile if user is logged in.
    if(!user){
        userButton = (
            <div class="flex-col flex flex-0 text-gray-300 space-y-2">
                <div class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:cursor-pointer" onClick={props.showLogin}>
                    <svg class="flex-shrink-0 w-5 h-5 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                    </svg>
                    <span class="flex-1 ms-5 whitespace-nowrap font-medium">Sign In</span>
                </div>
            </div>
        );
    }else{
        userButton = (
            <div class="relative flex-col flex flex-0 text-gray-300 ">
                <UserMenu trigger={usermenu}/>
                <div class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:cursor-pointer" onClick={() => updateusernmenu((usermenu)?false: true)}>
                    <svg class="flex flex-shrink-0 mr-3 py-[3px] pl-[3px] pr-[1px] w-7 h-7 transition duration-75 rounded-full border-2 border-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                    </svg>
                    <span class="flex-1 ms-2 whitespace-nowrap font-medium">{user}</span>
                </div>
            </div>
        );
    }

    let navbar = (
        <div class="flex-shrink-0 h-screen w-[260px]">
            <nav class="bg-gray-800 text-black inset-y-0 left-0 w-full h-screen shadow-2xl px-3 py-4">
                <div class="flex flex-col flex-1 w-full h-[95%] space-y-2 text-white overflow-y-auto">
                    <div class="flex items-center p-2 text-gray-300 rounded-lg">
                        <h1 class="text-4xl pt-2 pb-10 break-all">Welcome to DocQA!</h1>
                    </div>
                    <Link to="/" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:cursor-pointer">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                        </svg>
                        <span class="flex-1 ms-5 whitespace-nowrap font-medium">Chat</span>
                    </Link>
                    <Link to="/documents" class="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:cursor-pointer">
                        <svg class="flex-shrink-0 w-5 h-5 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
                        </svg>
                        <span class="flex-1 ms-5 whitespace-nowrap font-medium">Documents</span>
                    </Link>
                </div>

                {userButton}

            </nav>
        </div>
      );

    
    return navbar; 
}


export default NavBar;