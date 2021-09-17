const convert = (type) => {
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

export default convert