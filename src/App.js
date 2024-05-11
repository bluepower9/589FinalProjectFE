import './App.css';
import React from 'react';
import './styles.css';
import NavBar from './components/NavBar/NavBar';
import ChatBox from './components/ChatBox/ChatBox';
import LoginWindow from './components/LoginWindow/LoginWindow';
import RegisterWindow from './components/LoginWindow/RegisterWindow';


const SessionId = React.createContext(localStorage.getItem('sessionId'));

class App extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      'sessionId': SessionId,
      showLoginWindow: false,
      showRegisterWindow: false,
      loggedIn: false,
      messages: []
    }

    this.genTestMsgs()
  }


  setLogin(val){
    // console.log('setting state... value: ' + val)
    this.setState({loggedIn: true});
    console.log('new state: ' + this.state['loggedIn']);
  }


  newMessage(msg){
    let msgs = structuredClone(this.state.messages);
    msgs.push(msg);
    this.setState({messages: msgs});
  }


  genTestMsgs(){
    let msgs = this.state['messages']
    for(let i=0; i<10; i++){
        msgs.push({'msg': 'This is message '+i, 'user': 'You'});
        msgs.push({'msg': 'This is message '+i, 'user': 'DocQA'});
    }

    this.setState({'messages': msgs});
  }


  render() {
    return (
      <div class="flex h-full w-full overflow-hidden">
        <NavBar showLogin={() => this.setState({showLoginWindow:true})} loggedIn={this.state['loggedIn']}/>
        <ChatBox messages={this.state.messages} newMessage={(msg) => this.newMessage(msg)} invalidSession={() => this.setState({loggedIn: false})}/>
        <LoginWindow trigger={this.state.showLoginWindow} setLoginWindow={(val) => this.setState({showLoginWindow: val})} 
          setLogin={(val) => this.setState({loggedIn: val})} setRegisterWindow={(val) => this.setState({showRegisterWindow: val})}/>
        <RegisterWindow trigger={this.state.showRegisterWindow} setRegisterWindow={(val) => this.setState({showRegisterWindow: val})}
          setLoginWindow={(val) => this.setState({showLoginWindow: val})}/>
      </div>
  
    );
  }
}

export default App;
