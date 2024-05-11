import { useEffect, useState } from "react";


async function getDocumentText(doc_id){
    let domain = window.CONFIG['domain'];
    console.log(domain);
    const access_token = localStorage.getItem('access_token');

    try{
        let payload = new FormData();
        payload.append('doc_id', doc_id);
        const res = await fetch(domain + '/documents/file',{
            method: 'POST',
            body:payload,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });

        const data = await res.json();
        // console.log('received data: ' + data.text)
        return data.text;

    } catch(error){
        console.log('unable to fetch documents.');
    }
    return '';
}


async function deleteDocument(doc_id, setTrigger, updatedeleted){
    let domain = window.CONFIG['domain'];
    console.log(domain);
    const access_token = localStorage.getItem('access_token');

    let confirmBtn = document.getElementById("confirmBtn");
    let backBtn = document.getElementById("backBtn");
    confirmBtn.disabled = true;
    backBtn.disabled = true;

    try{
        let payload = new FormData();
        payload.append('doc_id', doc_id);
        const res = await fetch(domain + '/documents/delete',{
            method: 'POST',
            body:payload,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });

        const data = await res.json();
        setTrigger(false);
        updatedeleted(true);
        window.location.reload();

    } catch(error){
        console.log('unable to delete document.');
    }finally{
        confirmBtn.disabled = false;
        backBtn.disabled = false;
    }
}



function DeleteConfirmation(props){
    const [deleted, updatedeleted] = useState(false);

    return (props.trigger)? (
        <div class="fixed flex w-screen h-screen justify-center items-center bg-gray-700/75">
            <div class="fixed w-[25%] h-[25%] bg-gray-800 shadow-2xl shadow-gray-400 rounded-xl">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-bold text-lg" onClick={() => props.setTrigger(false)}> x </button>
                <div class="flex flex-col text-lg mt-5 items-center">
                    <label class="mt-10">Are you sure you want to delete this file?</label>
                    <div class="flex flex-row m-5">
                        <button id="confirmBtn" class="w-28 my-5 mr-10 px-3 bg-gray-600 rounded-full hover:bg-gray-700" onClick={() => deleteDocument(props.docId, props.setTrigger, updatedeleted)}>confirm</button>
                        <button id="backBtn" class="w-28 my-5 px-3 bg-gray-600 rounded-full hover:bg-gray-700" onClick={() => props.setTrigger(false)}>back</button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}


function DocumentInfo(props){
    const [doctext, updatedoctext] = useState("");
    const docdata = props.documents.find((item) => item.id == props.trigger);
    useEffect(() => {
        const fetchData = async () => {
            if(props.trigger){
                updatedoctext("");
                const text = await getDocumentText(docdata.id);
                updatedoctext(text);
            }
        };

        fetchData();        
    }, [docdata, props])


    const [delconfirm, updatedelconfirm] = useState(false);
    

    let text = doctext;

    return (props.trigger)? (
        <div class="fixed flex w-screen h-screen ml-[-260px] justify-center items-center bg-gray-700/75">
            <div class="fixed w-[70%] h-[70%] bg-gray-800 shadow-2xl shadow-gray-400 rounded-xl">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-bold text-lg" onClick={() => props.setTrigger(false)}> x </button>
                <div class="flex flex-col w-full h-full items-center p-5 m-auto text-gray-200 ">
                    <div class="flex flex-row w-full">
                        <div class="flex w-full relative p-5 bg-gray-500 text-3xl rounded-full">
                            <label class="break-all line-clamp-1">{docdata.title}</label>
                        </div>
                        <div class="flex items-center mx-3 bg-gray-500 rounded-3xl hover:bg-gray-700 hover:cursor-pointer" onClick={() => updatedelconfirm(true)}>
                            <svg class="flex flex-shrink-0 w-20 h-20 px-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex w-full h-full mt-3">
                        <div class="flex flex-col items-center w-[70%] px-3 mr-5 h-full bg-gray-300 rounded-2xl">
                            <div class="m-3 bg-gray-600 py-3 px-10 rounded-full">Extracted Text</div>                            
                            <textarea value={text} spellCheck="false" disabled class="w-full h-full p-2 mb-3 mx-5 bg-gray-600 rounded-2xl overflow-y-auto text-base resize-none outline-0 hover: cursor-text"></textarea>
                        </div>
                        <div class="flex flex-col h-full w-[30%] px-3 items-center bg-gray-300 rounded-2xl">
                            <div class="w-fit m-3 py-3 px-5 rounded-full bg-gray-600 ">Description</div>
                            <textarea value={docdata.description} spellCheck="false" disabled class="w-full h-full p-2 mb-3 mx-5 bg-gray-600 rounded-2xl overflow-y-auto text-base resize-none outline-0 hover:cursor-text"></textarea>                        
                        </div>
                    </div>
                </div>
            </div>
            <DeleteConfirmation trigger={delconfirm} setTrigger={updatedelconfirm} docId={docdata.id}/>
        </div>
    ) : "";

}


export default DocumentInfo;