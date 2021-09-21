import React, { useEffect, useState } from 'react';
import { getPlayerStatisticsUrl, getStatisticsUrl } from '../../../queries/queries';
import PlayerClanBadge from '../../../components/ClanBadge';
import BattleTypeSelector from '../../../components/BattleTypeSelector';
import './PlayerStatisticsPage.style.scss';
import BATTLE_TYPES from '../../../globals/battleTypes';

const PlayerStatisticsPage = ({
    server,
    id,
    name
}) => {
    const [data, setData] = useState(null);
    // TODO: battle type selector
    const [battleType, setBattleType] = useState(BATTLE_TYPES[0]);

    useEffect(() => {
        fetch(getPlayerStatisticsUrl(server, id, battleType))
            .then(response => response.json())
            .then(data => {
                setData(data.data[id]);
            })
            .catch(error => {
                console.log("we got an error")
            })
    }, [server, id, battleType])


    if (data) {
        return (
            <>
                <div className="player-statistics-head">
                    <PlayerClanBadge
                        server={server}
                        playerId={id}
                        fallbackName={name}
                    />
                    <BattleTypeSelector
                        value={battleType}
                        onChange={(value) => {
                            setBattleType(value);
                        }}
                    />
                </div>
                {JSON.stringify(data)}
            </>
        )
    }
    else {
        return null
    }

}

export default PlayerStatisticsPage
