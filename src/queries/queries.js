export const appId = "62da3ef417f70e5ffeb44cf6fa339e1e";
export const appIdParam = "?application_id=62da3ef417f70e5ffeb44cf6fa339e1e";
export const apiPath = "https://api.worldoftanks.";

export const convertType = (type) => {
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

export const getQueryString = (
    name,
    server,
    type,
) => {
    return `${apiPath}${server}/wot/${convertType(type)}/list/${appIdParam}&search=${name}&limit=10`
}

export const fetchHeaderSearchFormPreview = async (
    name,
    server,
    type
) => {
    const result = await fetch(
        `https://api.worldoftanks.${server}/
            wot/
            ${convertType(type)}/
            list/
            ${appIdParam}
            &search=${name}
            &limit=10`
    )
    //

    return result
}
