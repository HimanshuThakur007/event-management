
function useFetch() {
    const ServerRequest = async (req) => {

       
        let response = await fetch(req)
        let data = await response.json()

        return { response, data }
    }

   
    let callFetch = async (url, label, body) => {

    let ip = localStorage.getItem("Url");
    let port = localStorage.getItem("Port");
        let baseURL = `http://${ip}:${port}`;
  
        const userData = sessionStorage.getItem('userData')
        const token = JSON.parse(userData).TokenId;
        const urlStr = baseURL + url
        var req;
        let h = new Headers();
        h.append('Accept', 'application/json');
        h.append('CompCode', 'ESEVENTDB');
        h.append("Content-Type", "application/json");
        h.append('FYear', '0');
        h.append('Authorization', `Bearer ${token}`)
        if (label === 'POST') {
            req = new Request(urlStr, {
                method: 'POST',
                headers: h,
                body: JSON.stringify(body),
                mode: 'cors'
            });

        } else {
            req = new Request(urlStr, {
                method: 'GET',
                headers: h,
                mode: 'cors',

            });


        } 

        let { response, data } = await ServerRequest(req)
        return { res: response, got: data }
    }
    

    return callFetch
}

export default useFetch;

