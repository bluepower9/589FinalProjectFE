import React from "react";


// const SessionId = React.createContext(localStorage.getItem('sessionId'));


async function handleLogin(props){
    let domain = window.CONFIG['domain'];
    document.getElementById("loginButton").disabled = true;

    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    console.log(domain);

    let payload = new FormData();
    payload.append("username", username);
    payload.append("password", password);

    const res = await fetch(domain + '/login',{
        method: 'POST',
        body: payload,
    });

    const data = await res.json();
    const status = res.status;

    if(status === 200){
        const token = data['token'];
      
        localStorage.setItem('access_token', token['access_token']);
        localStorage.setItem('token_type', token['token_type']);
        localStorage.setItem('username', data['username']);

        // console.log(localStorage.getItem('access_token'));
        // console.log(token);

        props.setLoginWindow(false);
        props.setLogin(true);

    } else if(status === 401){
        const msg = "Incorrect username or password."
        let msglabel = document.getElementById('loginMsg');
        msglabel.innerHTML = msg;
        msglabel.style.display = 'block';
        props.setLogin(false);

    } else{
        const msg = "Error logging in."
        let msglabel = document.getElementById('loginMsg');
        msglabel.innerHTML = msg;
        msglabel.style.display = 'block';
        props.setLogin(false);
    }

    document.getElementById('loginButton').disabled = false;
}


function switchToRegisterWindow(props){
    props.setLoginWindow(false);
    props.setRegisterWindow(true);
}


function LoginWindow(props){
    return (props.trigger)?(
        <div class="fixed flex w-screen h-screen justify-center items-center bg-gray-700/75" >
            <div class="relative flex p-0 m-0 w-[350px] h-[400px] bg-gray-500 shadow-2xl shadow-gray-400 rounded-lg">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-medium text-lg" onClick={() => props.setLoginWindow(false)}> x </button>
                <div class="flex flex-col w-full mx-20 my-10 text-gray-200">
                    <label class="flex text-xl mb-5">Welcome to DocQA!</label>
                    <label id="loginMsg" class="flex flex-col text-sm mt-[-10px] text-red-400 hidden">status</label>
                    <form>
                        <label class="flex flex-col">Username</label>
                        <input name="username" id="usernameInput" class="flex flex-col w-full mt-2 mb-5 py-2 px-2 rounded-lg bg-gray-800"/>
                        <label class="flex flex-col">Password</label>
                        <input name="password"  id="passwordInput" class="flex flex-col w-full mt-2 mb-0 py-2 px-2 rounded-lg bg-gray-800" type="password"/>
                        <label class="flex text-xs w-full my-0 justify-end hover:text-gray-400 hover: cursor-pointer">Forgot password</label>
                        <button id="loginButton" type="button" onClick={() => handleLogin(props)} class="flex bg-gray-600 px-2 py-1 rounded-lg text-sm border-4 border-gray-800 hover:bg-gray-800">submit</button>
                    </form>
                    <div class="flex w-full flex-col">
                        <label class="flex w-full text-sm mt-1">or</label>
                        <label class="flex w-full text-sm mt-1 hover:text-gray-400 hover:cursor-pointer" onClick={() => switchToRegisterWindow(props)}>Click here to register.</label>
                    </div>
                </div>
            </div>
        </div>
    ): "";
}


export default LoginWindow;