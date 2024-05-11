import React from "react";

async function resetPassword(){
    let domain = window.CONFIG['domain'];
    let payload = new FormData();
    let email = document.getElementById('resetEmailInput');
    let resetbtn = document.getElementById('resetBtn');
    resetbtn.disabled = true;

    email = email.value.trim();

    payload.append("email", email);

    try{
        let res = await fetch(
            domain + "/resetpw",{
                method: "POST",
                body: payload
            }
        )

        const data = await res.json();
        let resetmsg = document.getElementById('resetMsg');
        resetmsg.innerHTML = "If an account is found, an email will be sent.";

    }catch(error){
        console.log(error);

    }finally{
        resetbtn.disabled = false;
    }
        
}


function ResetPwWindow(props){
    return (props.trigger)?(
        <div class="fixed flex w-screen h-screen justify-center items-center bg-gray-700/75" >
            <div class="relative flex p-0 m-0 w-[350px] h-[400px] bg-gray-500 shadow-2xl shadow-gray-400 rounded-lg">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-medium text-lg" onClick={() => props.setResetPwWindow(false)}> x </button>
                <div id="registerForm" class="flex flex-col w-full mx-20 mt-8 text-gray-200 text-sm">
                    <label class="flex text-xl mb-2">Reset Password</label>
                    <label id="registerMsg" class="flex flex-col text-sm text-red-400 hidden">status</label>
                    <label class="flex text-sm mt-10 mb-3">Input email to reset your password.</label>
                    <form>
                        <label id="resetMsg" class="flex text-sm text-blue-400"></label>
                        <label class="flex">Email</label>
                        <input name="email" id="resetEmailInput" class="flex flex-col w-full mt-1 mb-2 py-2 px-2 rounded-lg bg-gray-800"/>
                        <button id="resetBtn" type="button" onClick={() => resetPassword()} class="flex bg-gray-600 px-2 py-1 mt-3 rounded-lg text-sm border-4 border-gray-800 hover:bg-gray-800">submit</button>
                    </form>
                </div>
            </div>
        </div>
    ): "";
}

export default ResetPwWindow;