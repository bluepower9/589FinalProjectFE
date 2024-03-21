import React from "react";
import {Typed, ReactTyped} from 'react-typed';

const botIcon = (
    <svg class="flex flex-shrink-0 mr-3 py-[3px] pl-[3px] pr-[1px] w-7 h-7 transition duration-75 rounded-full border-2 border-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5"/>
    </svg>
);

const userIcon = (
    <svg class="flex flex-shrink-0 mr-3 py-[3px] pl-[3px] pr-[1px] w-7 h-7 transition duration-75 rounded-full border-2 border-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
    </svg>
);



function Messages(props){
    let result = [];
    const ogMsgs = props.messages;
    let msgs = structuredClone(ogMsgs);
    const lastUser = msgs[msgs.length-1]['user'];
    
    if(lastUser==='DocQA'){
        console.log('using typed effect');
        msgs[msgs.length-1]['msg'] = (
            <ReactTyped strings={[msgs[msgs.length-1]['msg']]} typeSpeed={25} showCursor={false}/>
        );
    }

    

    //reads msgs from ChatBox state and generates li items for each.
    for(let i=msgs.length-1; i>=0; i--){
        const m = msgs[i];
        let message = m.msg
        let user = m.user
        result.push((
            <li class="flex flex-col-reverse w-full my-5 text-gray-200">
                <div class="flex flex-col">
                        <div class="flex flex-0 items-center mb-2">
                            {(user==='DocQA')?botIcon: userIcon}
                            <div class="flex w-full font-medium text-xl">
                                {user}
                            </div>
                        </div>
                    <div class="flex w-full justify-left pl-10 pr-3 break-words">
                        {message}
                    </div>
                </div>
            </li>
        )
        );
    }


    return (
        <div class="flex flex-1 mx-2 mt-5 mb-2 p-2 h-full max-h-full overflow-y-auto">
            <ul class="flex flex-col-reverse w-full h-full overflow-y-auto">
                {result}
            </ul>

        </div>

    );


}

export default Messages;

