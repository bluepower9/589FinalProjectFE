import './App.css';
import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import './styles.css';
import NavBar from './components/NavBar/NavBar';
import ChatPage from './pages/ChatPage';
import DocsPage from './pages/DocsPage';
import RegisterWindow from './components/LoginWindow/RegisterWindow';
import LoginWindow from './components/LoginWindow/LoginWindow';
import DocumentInfo from './components/DocumentInfo/DocumentInfo';


const SessionId = React.createContext(localStorage.getItem('sessionId'));

class App2 extends React.Component {
  constructor(props) { 
    super(props);
    this.state = {
      'sessionId': SessionId,
      showLoginWindow: false,
      showRegisterWindow: false,
      loggedIn: false,
    }

  }


  setLogin(val){
    // console.log('setting state... value: ' + val)
    this.setState({loggedIn: true});
    console.log('new state: ' + this.state['loggedIn']);
  }





  render() {
    return (
      <div class="flex h-full w-full overflow-hidden">
        <BrowserRouter>
          <NavBar showLogin={() => this.setState({showLoginWindow:true})}/>
          <Routes>
              <Route path="/" element={
                  <ChatPage />
              } />
              <Route path="/documents" element={
                  <DocsPage />
              } />
          </Routes>
          <LoginWindow trigger={this.state.showLoginWindow} setLoginWindow={(val) => this.setState({showLoginWindow: val})} 
            setLogin={(val) => this.setState({loggedIn: val})} setRegisterWindow={(val) => this.setState({showRegisterWindow: val})}/>
          <RegisterWindow trigger={this.state.showRegisterWindow} setRegisterWindow={(val) => this.setState({showRegisterWindow: val})}
            setLoginWindow={(val) => this.setState({showLoginWindow: val})}/>
          {/* <DocumentInfo trigger={false}/> */}
        </BrowserRouter>
      </div>
  
    );
  }
}

export default App2;
