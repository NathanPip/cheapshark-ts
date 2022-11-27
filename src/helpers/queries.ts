export const toSearchParams = (params: object) => {
    let string = "";
    for(let i=0; i<Object.keys(params).length; i++) {
        if(Object.values(params)[i])
            string += `${Object.keys(params)[i]}=${Object.values(params)[i]}&`;
    }
    return string;
}