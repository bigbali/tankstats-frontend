export const GAME_ID = "wot";
export const APP_ID = "62da3ef417f70e5ffeb44cf6fa339e1e";
export const APP_ID_PARAM = "?application_id=62da3ef417f70e5ffeb44cf6fa339e1e";
export const API_PATH = "https://api.worldoftanks";

export const getApiPath = (server) => {
    return `${API_PATH}${getServerDomain(server)}/`
}

export const getIdParam = (searchType, id) => {
    if (searchType === "player"){
        return `&account_id=${id}`
    }
    else if (searchType === "clan"){
        return `&clan_id=${id}`
    }
}

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
    // Making it lower case allows for both upper and lower case letters
    switch (server){
        case "EU".toLowerCase():
            return ".eu"
        case "NA".toLowerCase():
            return ".com"
        case "RU".toLowerCase():
            return ".ru"
        case "SEA".toLowerCase():
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


export const getStatisticsUrl = (
    id,
    server,
    type
    ) => {
        let url = [
            `${API_PATH}${getServerDomain(server)}/`,
            `${GAME_ID}/`,
            `${getUrlSearchType(type)}/`,
            "info/",
            `${APP_ID_PARAM}`,
            `${getIdParam(type, id)}`,
        ]
        
        return url.join("")
}
    
export const getPlayerStatisticsUrl = (
    server,
    id,
    battleType
    ) => {
        const getBattleTypeSpecific = () => {
            if (battleType === "random") {
                return "&fields=statistics.random&extra=statistics.random"
            }
            if (battleType === "cw-10") {
                return "&fields=statistics.globalmap_absolute&extra=statistics.globalmap_absolute"
            }

            return ""
        }
        let url = [
            `${getApiPath(server)}`,
            `${GAME_ID}/`,
            "account/",
            "info/",
            `${APP_ID_PARAM}`,
            `&account_id=${id}`,
            `${getBattleTypeSpecific()}`
        ]
        
        return url.join("")
}
    
export const getClanPrefetchUrl = (
    server,
    id
) => {
    let url = [
        `${API_PATH}${getServerDomain(server)}/`,
        `${GAME_ID}/`,
        "clan/",
        "info/",
        `${APP_ID_PARAM}`,
        `&clan_id=${id}`,

    ]

    return url.join("")
}

export const getClanBadgeUrl = (
    server,
    playerId
) => {
    let url = [
        `${API_PATH}${getServerDomain(server)}/`,
        `${GAME_ID}/`,
        "clans/",
        "accountinfo/",
        `${APP_ID_PARAM}`,
        `&account_id=${playerId}`,
        "&fields=",
        "joined_at,",
        "role,",
        "clan.name,",
        "clan.color,",
        "clan.tag,",
        "clan.emblems.x195,",
        "clan.clan_id,",
        "account_name"
    ]

    console.log(url.join(""))
    return url.join("")
}