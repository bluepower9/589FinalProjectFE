import React from "react";


async function registerNewUser(props){
    let domain = window.CONFIG['domain'];
    document.getElementById("registerButton").disabled = true;

    const access_token = localStorage.getItem('access_token');
    let email = document.getElementById("emailInput").value;
    let username = document.getElementById("usernameInput").value;
    let password = document.getElementById("passwordInput").value;
    console.log(domain);

    let payload = new FormData();
    payload.append("email", email);
    payload.append("username", username);
    payload.append("password", password);

    const res = await fetch(domain + '/register',{
        method: 'POST',
        body: payload,
        headers:{
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await res.json();
    const result = data['result'];
    const status = res.status;

    if(status === 200 && result){
        let el = document.getElementById("registerMsg");
        el.innerHTML = "Successfully registered. Please login to continue.";
        el.style.color = 'darkseagreen';
        el.style.display = 'block';

    } else{
        let msg = "Error registering. "
        if(result !== null){
            msg += data['message']
        }

        let msglabel = document.getElementById('registerMsg');
        msglabel.innerHTML = msg;
        msglabel.style.color = 'hotpink';
        msglabel.style.display = 'block';
    }

    document.getElementById('registerButton').disabled = false;
}


function RegisterWindow(props){
    return (props.trigger)?(
        <div class="fixed flex w-screen h-screen justify-center items-center bg-gray-700/75" >
            <div class="relative flex p-0 m-0 w-[350px] h-[400px] bg-gray-500 shadow-2xl shadow-gray-400 rounded-lg">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-medium text-lg" onClick={() => props.setRegisterWindow(false)}> x </button>
                <div id="registerForm" class="flex flex-col w-full mx-20 mt-8 text-gray-200 text-sm">
                    <label class="flex text-xl mb-2">Register below</label>
                    <label id="registerMsg" class="flex flex-col text-sm text-red-400 hidden">status</label>
                    <form>
                        <label class="flex">Email</label>
                        <input name="email" id="emailInput" class="flex flex-col w-full mt-1 mb-2 py-2 px-2 rounded-lg bg-gray-800"/>
                        <label class="flex flex-col">Username</label>
                        <input name="username" id="usernameInput" class="flex flex-col w-full mt-1 mb-2 py-2 px-2 rounded-lg bg-gray-800"/>
                        <label class="flex flex-col">Password</label>
                        <label class="flex text-xs italic">6&lt;pw&lt;16, uppercase, lowercase, number, special</label>
                        <input name="password"  id="passwordInput" class="flex flex-col w-full mt-1 mb-0 py-2 px-2 rounded-lg bg-gray-800" type="password"/>
                        <button id="registerButton" type="button" onClick={() => registerNewUser(props)} class="flex bg-gray-600 px-2 py-1 mt-3 rounded-lg text-sm border-4 border-gray-800 hover:bg-gray-800">submit</button>
                    </form>
                </div>
            </div>
        </div>
    ): "";
}


export default RegisterWindow;