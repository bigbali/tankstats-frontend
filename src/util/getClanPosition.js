const getClanPosition = (clanPosition) => {
    switch(clanPosition.toLowerCase()){
        case "reservist":
            return "Reservist"
        case "recruit":
            return "Recruit"
        case "private":
            return "Private"
        case "quartermaster":
            return "Quartermaster"
        case "junior_officer":
            return "Junior Officer"
        case "intelligence_officer":
            return "Intelligence Officer"
        case "combat_officer":
            return "Combat Officer"
        case "recruitment_officer":
            return  "Recruitment Officer"
        case "personnel_officer":
            return "Personnel Officer"
        case "executive_officer":
            return "Executive Officer"
        case "commander":
            return "Commander"
        default:
            return
    }
}

export default getClanPosition