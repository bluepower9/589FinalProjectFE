import React from "react";
import Messages from "../components/ChatBox/Messages";
import MessageInput from "../components/ChatBox/MessageInput";


class ChatPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            messages: []
          }
      
          this.restoreMsgs();
          if(this.state.messages.length === 0){
            this.createWelcomeMsg();
          }
        }

    restoreMsgs(){
        const msgs_string = localStorage.getItem('messages');
        console.log('prev msgs: ' + msgs_string)
        if(msgs_string){
            try{
                const msgs = JSON.parse(msgs_string);
                for(const m of msgs){
                    console.log(m);
                    this.state.messages.push(m);
                }
            }catch(error){
                console.log('Error restoring msgs: '+error);
                return;
            }
        }
    }


    addMsgLocalStorage(m){
        const msgs = localStorage.getItem('messages');
        console.log('adding new msg: ' + msgs);
        if(msgs){
            let msg_strings = JSON.parse(msgs);
            msg_strings.push(m);
            localStorage.setItem('messages', JSON.stringify(msg_strings));
        }else{
            localStorage.setItem('messages', JSON.stringify([m]));
        }
    }


    async handleQuestionInput(){

        const el = document.getElementById("questionInput");
        const txt = el.value;

        if(txt.trim() !== ""){
            const msgdata = {'msg': txt, 'user': 'You'}
            await this.newMessage(msgdata);
            this.addMsgLocalStorage(msgdata);
            el.value="";
            await this.sendQuestion(txt);
        }

        el.value = "";
    }

    async sendQuestion(question){
        const domain = window.CONFIG['domain'];
        const access_token = localStorage.getItem('access_token');

        console.log('sending question... has access_token = ' + access_token!==null);

        if(!access_token){
            console.log('no access token found.');
            const no_login_msg = {'user': 'DocQA', 'msg': 'You must be logged in to ask questions.'}
            this.newMessage(no_login_msg);
            this.addMsgLocalStorage(no_login_msg);
            return;
        }

        let payload = new FormData();
        payload.append('query', question);
        let msg = null;

        try{
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
                msg = {'user': 'DocQA', 'msg': data['message']};
            } else{
                console.log('error sending query. Invalidating session.');
                msg = {'user': 'DocQA', 'msg': 'Unexpected error while retrieving response. Please re-login to continue.'};
            }

        } catch(error){
            console.log('Unable to connect to server.');
            msg = {'user': 'DocQA', 'msg': 'Unable to connect to service. Please try again later.'};
        }

        this.newMessage(msg);        
        this.addMsgLocalStorage(msg);
    }


    newMessage(msg){
        let msgs = structuredClone(this.state.messages);
        msgs.push(msg);
        this.setState({messages: msgs});
      }
    
    
    createWelcomeMsg(){
        let msgs = this.state['messages'];
        const welcomeMsg = {'msg': 'Welcome to DocQA your personal document query system! Ask me a question about any document you have uploaded and I will provide you with an answer.', 'user': 'DocQA'};
        msgs.push(welcomeMsg);
        this.setState({'messages': msgs});
        localStorage.setItem('messages', JSON.stringify([welcomeMsg]))
    }


    genTestMsgs(){
    let msgs = this.state['messages']
    for(let i=0; i<10; i++){
        msgs.push({'msg': 'This is message '+i, 'user': 'You'});
        msgs.push({'msg': 'This is message '+i, 'user': 'DocQA'});
    }

    this.setState({'messages': msgs});
    }
    

    render(){
        return (
            <div class="relative flex h-full max-w-full flex-1 overflow-hidden">
                <div class="relative flex flex-col flex-1 mx-auto gap-3 max-w-[45rem]">
                    <Messages messages={this.state.messages}/>
                    <MessageInput handleClick={() => this.handleQuestionInput()}/>
                </div> 
            </div>
        );
    }
}



export default ChatPage;