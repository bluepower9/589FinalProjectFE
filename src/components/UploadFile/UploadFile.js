import { useEffect, useState } from "react";

function getFinalFileData(fileInfo){
    let result = {filename: fileInfo.name, description: ""};
    const filename = document.getElementById("fileUploadName");
    const description = document.getElementById("fileUploadDesc");
    if(filename.value.trim() !== ""){
        result.filename = filename.value.trim();
    }
    console.log(description.value.trim());
    if(description.value.trim() !== ""){
        result.description = description.value.trim();
    }

    return result;
}


function getFileData(e, updateFileInfo){
    if(e.target.files) {
        console.log(e.target.files[0]);
        updateFileInfo(e.target.files[0]);
    }else {
        updateFileInfo(null);
    }
}

async function sendFile(fileInfo){
    let statusmsg = document.getElementById("uploadStatus");
    statusmsg.innerHTML = "";

    if(fileInfo === null){
        return;
    }

    let data = getFinalFileData(fileInfo);
    const access_token = localStorage.getItem('access_token');
    let domain = window.CONFIG['domain'];

    console.log(data);

    if(data.description === null || data.description === ""){
        let statusmsg = document.getElementById("uploadStatus");
        statusmsg.innerHTML = "Must include a description." ;
        return;
    }

    
    const formData = new FormData();
    formData.append("file", fileInfo);
    formData.append("title", data.filename);
    formData.append("description", data.description);

    try{
        const res = await fetch(domain + '/documents/upload',{
            method: 'POST',
            body:formData,
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            }
        });

        if(res.status === 200){
            window.location.reload();
            return;
        }
        
        //If unable to upload, create msg
        data = await res.json();
        let msg = data["detail"];
        let statusmsg = document.getElementById("uploadStatus");
        statusmsg.innerHTML = "Failed to upload document. " + msg;
        
    } catch(e){
        console.log(e);
        let statusmsg = document.getElementById("uploadStatus");
        statusmsg.innerHTML = "Failed to upload document. Please try again.";
    }
}


function convertSize(bytes){
    if(bytes < 1000){
        return `${bytes} bytes`;
    }else if(bytes < 1000000){
        return `${Math.round(bytes/1000 * 100)/100} KB`;
    }else{
        return `${Math.round(bytes/1000000 * 100)/100} MB`;
    }
}


function showUploadedInfo(fileInfo){
    console.log('fileinfo: ' + fileInfo);
    return (fileInfo)?(
        <div class="flex flex-col w-full mt-[20px] text-base">
            <label class="flex relative truncate my-1">File name: {fileInfo.name}</label>
            <label class="flex relative truncate my-1">Type: {fileInfo.type}</label>
            <label class="flex relative truncate my-1">Size: {convertSize(fileInfo.size)}</label>
        </div>
    ) : "";
}


function showStatusMsg(status){
    return (status !== "")? (
        <div class="flex mt-5 text-red-400 text-wrap">
            {status}
        </div>
    ): "";
}


function destroyWindow(props, updateFileInfo, updateUploadStatus){
    props.setTrigger(false); 
    updateFileInfo(null);
    updateUploadStatus("");
}


function UploadFile(props){

    const [uploadStatus, updateUploadStatus] = useState("");
    const [fileInfo, updateFileInfo] = useState(null);


    return (props.trigger)?(
        <div class="fixed flex w-screen h-screen ml-[-260px] justify-center items-center bg-gray-700/75">
            <div class="fixed w-[50%] h-[60%] bg-gray-800 shadow-2xl shadow-gray-400 rounded-xl">
                <button class="absolute top-0 right-0 mr-2 h-4 w-4 font-bold text-lg" onClick={() => destroyWindow(props, updateFileInfo, updateUploadStatus)}> x </button>
                <div class="flex flex-col w-full h-full items-center p-5 m-auto text-gray-200 ">
                    <div class="flex flex-row w-full">
                        <div class="flex relative px-5 py-3 bg-gray-500 text-3xl rounded-full">
                            <label class="break-all line-clamp-1">Upload New File</label>
                        </div>
                    </div>
                    <div class="flex w-full h-full mt-3 bg-gray-400 rounded-2xl">
                        <div class="flex flex-col w-[40%] p-2 m-2 rounded-2xl">
                            <div class="flex w-fit flex-0 relative py-1 px-3 mb-2 bg-gray-500 rounded-full">
                                Select File
                            </div>
                            <div class="relative flex flex-col h-full w-full p-3 bg-gray-600 rounded-2xl">
                                <label class="flex w-fit text-base mb-3 bg-gray-800 rounded-full px-3">Select or drop file below</label>
                                <div class="flex flex-col h-full text-sm text-wrap">
                                    <input class="flex w-full mt-2" type="file" onChange={(e) => getFileData(e, updateFileInfo)}/>
                                    {showUploadedInfo(fileInfo)}
                                    <div id="uploadStatus" class="flex mt-5 text-red-400 text-wrap">
                                        
                                    </div>
                                </div>
                                <div class="absolute flex w-full ml-[-12px] bottom-0 justify-center">
                                <button class="flex mb-3 py-3 px-10 bg-gray-800 h-fit rounded-full hover:bg-gray-400 hover:text-black" onClick={() => sendFile(fileInfo, updateUploadStatus)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="flex w-10 h-10" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"/>
                                        <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"/>
                                    </svg>
                                </button>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col w-[60%] p-2 my-2 mr-2 rounded-2xl">
                            <div class="flex w-fit flex-0 relative py-1 px-3 mb-2 bg-gray-500 rounded-full">
                                Modify File Information
                            </div>
                            <div class="flex flex-col h-full w-full bg-gray-600 rounded-2xl">
                                <label class="flex h-fit w-fit mt-3 mb-2 mx-3 px-2 bg-gray-400 text-black font-semibold rounded-full text-xl">
                                    Filename
                                </label>
                                <input id="fileUploadName" class="flex mx-3 px-2 py-1 rounded-full text-lg bg-gray-800 text-base" placeholder="Optional"/>
                                <label class="flex h-fit w-fit mt-3 mx-3 px-2 bg-gray-400 rounded-full text-black font-semibold text-xl">Description</label>
                                <textarea id="fileUploadDesc" placeholder="Enter description (required)" class="flex h-full mt-2 mb-3 px-2 mx-3 py-1 rounded-2xl text-lg bg-gray-800 text-base resize-none" />
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    ) : ""
}


export default UploadFile;