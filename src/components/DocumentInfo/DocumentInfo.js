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


    let text = doctext;

    return (props.trigger)? (
        <div class="fixed flex w-screen h-screen ml-[-260px] justify-center items-center bg-gray-700/75">
            <div class="fixed w-[70%] h-[70%] bg-gray-800 shadow-2xl shadow-gray-400 rounded-xl">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-bold text-lg" onClick={() => props.setTrigger(false)}> x </button>
                <div class="flex flex-col w-full h-full items-center p-5 m-auto text-gray-200 ">
                    <div class="w-full relative p-5 bg-gray-500 text-3xl rounded-full">
                        <label class="break-all line-clamp-1">{docdata.title}</label>
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
        </div>
    ) : "";

}


export default DocumentInfo;