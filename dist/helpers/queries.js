export const toSearchParams = (params) => {
    let string = "";
    for (let i = 0; i < Object.keys(params).length; i++) {
        string += `${Object.keys(params)[i]}=${Object.values(params)[i]}&`;
    }
    return string;
};
