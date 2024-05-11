import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";


async function handleQuestionInput(props){

    const el = document.getElementById("questionInput");
    const txt = el.value;

    if(txt.trim() !== ""){
        await props.newMessage({'msg': txt, 'user': 'You'});
        el.value="";
        await sendQuestion(props, txt);
    }

    el.value = "";
}

async function sendQuestion(props, question){
    const domain = window.CONFIG['domain'];
    const access_token = localStorage.getItem('access_token');

    if(!access_token){
        console.log('no access token found.');
        props.newMessage({'user': 'DocQA', 'msg': 'You must be logged in to ask questions.'});
        props.invalidSession();
        return null;
    }

    let payload = new FormData();
    payload.append('query', question);
    const res = await fetch(domain + '/chat/query',{
      method: 'POST',
      body: payload,
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + access_token
      }
  });

    const data = await res.json();
    if(res.status === 200){
        props.newMessage({'user': 'DocQA', 'msg': data['message']});
    } else{
        console.log('error sending query. Invalidating session.');
        props.newMessage({'user': 'DocQA', 'msg': 'Unexpected error while retrieving response. Please re-login to continue.'});
        props.invalidSession();
    }
}


function ChatBox(props){
    return (
        <div class="relative flex h-full max-w-full flex-1 overflow-hidden">
            <div class="relative flex flex-col flex-1 mx-auto gap-3 max-w-[45rem]">
                <Messages messages={props.messages}/>
                <MessageInput handleClick={() => handleQuestionInput(props)}/>
            </div> 
        </div>
    );
}



export default ChatBox;