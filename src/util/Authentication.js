async function validateToken () {
    const domain = window.CONFIG['domain'];
    const access_token = localStorage.getItem('access_token');
    // const type = localStorage.getItem('token_type');

    if(!access_token){
        console.log('no access token found.')
        return null;
    }

    try{
        const res = await fetch(domain + '/testauth',{
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + access_token
        }
    });

        const data = await res.json();
        
        if(res.status===200){
            return data['username']
         }else{
            localStorage.clear();
            return null;
         } 
        
    } catch(error){
        console.log('Failed to fetch login status.');
        localStorage.clear();
        return null;
    }
}


function isAuthenticated(){
    const access_token = localStorage.getItem('access_token');

    return (access_token) ? true: false;
}

export {validateToken, isAuthenticated};