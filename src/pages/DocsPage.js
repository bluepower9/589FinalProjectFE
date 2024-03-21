import React from "react";
import { ReactTyped } from "react-typed";
import DocumentInfo from "../components/DocumentInfo/DocumentInfo";


class DocsPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            docs: [],
            showDoc: null
        };

        // this.createTestDocs();
    }

    //max-h-[50px]
    createDocuments(){
        let result = [];
        for(let doc of this.state['docs']){
            let container = (
            <div key={doc.id} id={doc.id} class="flex items-center mx-3 py-3  my-2 text-xl rounded-full hover:bg-gray-500 hover:cursor-pointer" onClick={(event) => this.showDocumentInfo(event)}>
                <label id={doc.id} class="w-[350px] break-all px-5 mr-5 overflow-hidden line-clamp-1 hover:cursor-pointer">{doc.title}</label>
                    <div id={doc.id} class=" flex-1 relative overflow-hidden line-clamp-1 hover:cursor-pointer">{doc.description}</div>
                <label id={doc.id} class ="flex ml-2 px-5 overflow-hidden hover:cursor-pointer">{doc.upload_date}</label>

            </div>
            )

            result.push(container);
        }
        return result;
    }


    showDocumentInfo(event){
        const docid = event.target.id;
        console.log('id clicked: ' + docid);
        this.setState({showDoc: docid});
    }

    
    createTestDocs(){
        let test = this.state.docs;
        for(let i=0; i<10; i++){
            let doc = {
                title: 'Test document super long name ' + (i+1),
                id: i,
                description: 'this is  test description. this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.this is  test description.',
                upload_date: '3/19/2024'
            }

            test.push(doc);
        }
        this.setState({docs: test});
        // console.log('test docs created. size: ' + this.state.docs.length + '  test size: ' + test)

    }

    async fetchDocuments(){
        let domain = window.CONFIG['domain'];
        console.log(domain);
        const access_token = localStorage.getItem('access_token');

        try{
            const res = await fetch(domain + '/documents/list-all',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    Authorization: 'Bearer ' + access_token
                }
            });

            const data = await res.json();
            let documents = data['documents']
            const status = res.status;

            if(status===200 && documents){
                let result = [];
                for(const doc of documents){
                    const date = new Date(doc.upload_ts).toLocaleDateString("en-US");
                    console.log('new date: ' + date);
                    result.push(
                        {
                            title: doc.title,
                            upload_date: date,
                            description: doc.descr,
                            id: doc.doc_id
                        }
                    )
                }

                this.setState({docs: result});
            }

        } catch(error){
            console.log('unable to fetch documents.');
        }
        return [];
    }

    async componentDidMount(){
        await this.fetchDocuments();
    }


    render(){
        let documents = this.createDocuments();
        console.log('documents length: ' + documents.length)

        return (
            <div class="flex flex-col w-full h-full text-2xl text-white font-mono">
                <div class="flex flex-col h-full mx-5">
                    <div class="flex my-5">
                        <div class="flex py-4 px-[55px] bg-gray-400 rounded-full items-center text-5xl font-bold text-gray-800">
                            <svg class="flex flex-shrink-0 w-10 h-10 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M13 0H6a2 2 0 0 0-2 2 2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 2 2 0 0 0 2-2V2a2 2 0 0 0-2-2m0 13V4a2 2 0 0 0-2-2H5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1M3 4a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/>
                            </svg>
                            <h1 class="flex items-center pl-3 ">Documents</h1>
                        </div>
                    </div>
                    <div class="relative flex flex-row w-full">
                        <div class="flex my-2 py-5 px-auto justify-center w-[400px] bg-gray-900 rounded-full">
                            <ReactTyped strings={["Manage your documents here"]} typeSpeed={40} showCursor={false}/>
                        </div>
                        {/* <label class="absolute flex right-0 bottom-0 justify-center mb-2 px-5 py-3 items-baseline rounded-full bg-gray-900 text-lg hover:bg-gray-900/60 hover:cursor-pointer">Delete</label> */}
                    </div>
                    <div class="relative w-full overflow-auto flex flex-col mx-auto mb-5 h-full px-auto bg-gray-400 rounded-2xl">
                        <div class="relative flex py-5 m-3 rounded-full bg-gray-500">
                            <label class="flex px-5">Title</label>
                            <label class="absolute flex ml-[-100px] left-1/2">Description</label>
                            <label class="absolute flex right-0 pr-5">Upload Date</label>
                        </div>
                        <div class="flex w-full flex-col overflow-y-auto">
                            {documents}
                        </div>
                    </div>
                </div>
                <DocumentInfo trigger={this.state.showDoc} setTrigger={(val) => this.setState({showDoc: val})} documents={this.state.docs}/>
            </div>
        )
    }
}


export default DocsPage;