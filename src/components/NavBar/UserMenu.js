import React from "react";


async function logOut(){
    const domain = window.CONFIG['domain'];
    let access_token = localStorage.getItem('access_token');

    try{
        await fetch(domain + '/logout',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });
    } catch(error){
        console.log('error contacting endpoint to log out.');
    }

    localStorage.clear();
    window.location.reload();

}


function UserMenu(props){
    return (props.trigger)?
    (
        <div class='absolute w-full bottom-0 mb-[50px] py-3 px-2 mx-auto bg-gray-500 rounded-lg font-bold'>
            {/* <label class="flex flex-col w-full py-2 my-1 px-3 rounded-lg hover:bg-gray-700 hover:cursor-pointer">profile</label> */}
            <label class="flex flex-col w-full py-2 my-1 px-3 rounded-lg hover:bg-gray-700 hover:cursor-pointer" onClick={() => logOut()}>logout</label>
        </div>
    ): "";
}


export default UserMenu;