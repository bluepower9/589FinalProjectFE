import React from "react";


function MessageInput(props){
    return (
        <div class="flex w-full mb-5 items-center">
            <div class="relative flex flex-col flex-grow mb-5 mx-2 px-2 overflow-hidden border-solid border-2 rounded-2xl border-gray-300 text-gray-300">
                <textarea id="questionInput" onKeyUp={(e) => {if(e.key==='Enter') props.handleClick()}} rows="1" data-id="root" placeholder="Ask a question..." class="relative w-full overflow-auto max-h-[54dvh] py-2 pr-7 m-0 resize-none outline-0 bg-transparent"></textarea>
                <div class="absolute right-2.5 bottom-1.5 text-gray-500 hover:text-gray-200" onClick={props.handleClick}>
                    <svg class="w-7 h-7 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z"/>
                    </svg>
                </div>
            </div>            
        </div>

    );

}


export default MessageInput;