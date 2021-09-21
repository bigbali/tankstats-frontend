const BATTLE_TYPES = [
    "random",
    "ranked",
    "skirmish",
    "advance",
    "cw-10",
    "cw-8",
    "cw-6"
]

export const getReadableBattleType = (battleType) => {
    switch(battleType){
        case "random":
            return "Random Battle"
        case "ranked":
            return "Ranked Battle"
        case "skirmish":
            return "Skirmish"
        case "advance":
            return "Advance"
        case "cw-10":
            return "Clan Wars tier 10"
        case "cw-8":
            return "Clan Wars tier 8"
        case "cw-6":
            return "Clan Wars tier 6"
        default:
            return "Unknown Battle Type"
    }
}

export default BATTLE_TYPES