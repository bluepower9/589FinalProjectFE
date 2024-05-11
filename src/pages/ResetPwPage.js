import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

async function check_key(key){
    const domain = window.CONFIG['domain'];

    try{
        const res = await fetch(domain + '/checkpwtoken',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + key
        }
    });

        // const data = await res.json();
        
        if(res.status===200){
            return true;
         }else{
            localStorage.clear();
            return false;
         } 
        
    } catch(error){
        console.log('Failed to fetch token info.');
        localStorage.clear();
        return false;
    }
}


async function sendNewPassword(pw, token){
    const domain = window.CONFIG['domain'];
    const access_token = token;

    let payload = new FormData();
    payload.append('newpw', pw);
    // let msg = "";

    try{
        const res = await fetch(domain + '/updatepw',{
            method: 'POST',
            body: payload,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });
        
        const data = await res.json();
        if(res.status === 200){
            return data;
        } else{
            console.log('error sending query. Invalidating session.');
            return {updated: false, message: "Failed to update password. Link expired."};
        }

    } catch(error){
        console.log('Unable to connect to server.');
        return {updated: false, message: "Failed to update password."};
    }
}


async function submitNewPassword(resetkey){
    let pw1 = document.getElementById("newpw").value;
    let pw2 = document.getElementById("newpwcopy").value;
    const msglabel = document.getElementById("pwResetMsg");
    msglabel.innerHTML = "";

    pw1 = pw1.trim();
    pw2 = pw2.trim();
    // let msg = "";

    if(pw1 === "" || pw2 === ""){
        msglabel.innerHTML = "Please fill out all fields."
    }else if(pw1 !== pw2){
        msglabel.innerHTML = "Passwords do not match."
    }
    else{
        let data = await sendNewPassword(pw1, resetkey);
        console.log('data: ' + data)
        if(!data['updated']){
            msglabel.innerHTML = data['message'];
        }else{
            window.location.replace("/");
        }
    }
}



function ResetPwpage(props){
    const [searchParams, setSearchParams] = useSearchParams();
    const [validToken, updateValidToken] = useState(null);
    let resetkey = searchParams.get("reset_token");

    useEffect(() => {
        const fetchData = async () => {
            const valid = await check_key(resetkey);
            updateValidToken(valid);
        };

        fetchData();        
    }, [resetkey])

    if(validToken){
        return (
            <div class="flex flex-col w-full text-white items-center justify-center">
                <div class="flex flex-col mb-3 text-xl">
                    <h1 class="flex mb-2">
                        Please input a new password below.
                    </h1>
                    <h1 id="pwResetMsg" class="text-red-400 text-base">

                    </h1>
                </div>
                <div class="flex flex-col">
                    <label class="flex italic mb-2 text-sm">6&lt;password length&lt;16, uppercase, lowercase, number, special</label>
                    <div class="flex flex-row">
                        <label class="flex mr-2 mr-9">New password:</label>
                        <input type="password" id="newpw"class="flex w-30 px-2 rounded-lg text-black" placeholder="password"/>
                    </div>
                    <div class="flex flex-row mt-2">
                        <label class="mr-2">Re-enter password: </label>
                        <input type="password" id="newpwcopy" class="flex w-30 px-2 rounded-lg text-black" placeholder="password"/>
                    </div>
                    <button type="submit" onClick={()=>submitNewPassword(resetkey)} class="flex px-2 w-fit rounded-lg my-2 bg-gray-400 text-black font-semibold hover:bg-gray-500 hover:cursor-pointer">
                        submit
                    </button>
                </div>
            </div>
        )
    }else if(validToken === false){
        return (
            <div class="flex w-full text-white items-center justify-center text-3xl">
                Invalid link or it may have expired.
            </div>
        )
    } else{
        return "";
    }
    
}


export default ResetPwpage;