import React from 'react';
import AppContainer from './appcontainer.jsx';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import config from 'config';

const AppRouter = (props) => {
    // let url = '103.25.128.155';
    // let port = '86'

    // let url = '210.89.34.139';
    // let port = '105'

    let url = '103.194.9.31';
    let port = '204'

    let serverUrl = '220.158.164.186';
    let serverPort = '86'
  

    let localUrl = '192.168.100.8'
    let localPort ='105';

    let currentPath = window.location.hostname || "";
    console.log('cr path',currentPath)
    React.useEffect(()=>{
        if(currentPath == 'localhost'){
            // development
            localStorage.setItem('Url',url)
            localStorage.setItem('Port', port)

        }
        else if(currentPath == '192.168.100.8'){
            // local server
            localStorage.setItem('Url',localUrl)
            localStorage.setItem('Port', localPort)
        }
        else
        {
            // main external server
            localStorage.setItem('Url',serverUrl)
            localStorage.setItem('Port', serverPort)
        }
    
    },[currentPath])
    return(
        <Router>
            <Route render={(props)=> <AppContainer {...props}/>} />
        </Router>
    );
    
}


export default AppRouter;