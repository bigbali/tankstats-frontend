export const GAME_ID = "wot";
export const APP_ID = "62da3ef417f70e5ffeb44cf6fa339e1e";
export const APP_ID_PARAM = "?application_id=62da3ef417f70e5ffeb44cf6fa339e1e";
export const API_PATH = "https://api.worldoftanks";


export const getUrlSearchType = (type) => {
    if (type === "player") {
        return "account"
    }
    else if (type === "clan") {
        return "clans"
    }
    else {
        return null
    }
}

export const getServerDomain = (server) => {
    switch (server){
        case "EU":
            return ".eu"
        case "NA":
            return ".com"
        case "RU":
            return ".ru"
        case "SEA":
            return ".sea"
        default:
            return ".eu"
    }
}

export const getPrefetchUrl = (
    name,
    server,
    type
) => {
    let url = [
        `${API_PATH}${getServerDomain(server)}/`,
        `${GAME_ID}/`,
        `${getUrlSearchType(type)}/`,
        "list/",
        `${APP_ID_PARAM}`,
        `&search=${name}`,
        "&limit=10"
    ]

    return url.join("")
}

// export const getQueryString = (
//     name,
//     server,
//     type,
// ) => {
//     return `${apiPath}${server}/wot/${convertSearchType(type)}/list/${appIdParam}&search=${name}&limit=10`
// }


// export const fetchHeaderSearchFormPreview = async (
//     name,
//     server,
//     type
// ) => {
//     const result = await fetch(
//         `https://api.worldoftanks.${server}/
//             wot/
//             ${convertSearchType(type)}/
//             list/
//             ${appIdParam}
//             &search=${name}
//             &limit=10`
//     )
//     //

//     return result
// }
