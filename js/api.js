export async function callApi(method,url,data){
    const requestOptions = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    const body = await fetch(url, requestOptions)

    let res = await body.json()
    // data = JSON.stringify(data);
    // data = JSON.parse(data);
    if(body.ok){
        return res
    }
}

export async function initCalender(){
    callApi()
}

