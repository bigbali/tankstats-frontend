import React, { useEffect, useState } from 'react';
import { getPlayerStatisticsUrl, getStatisticsUrl } from '../../../queries/queries';
import PlayerClanBadge from '../../../components/ClanBadge';
import './PlayerStatisticsPage.style.scss';

const PlayerStatisticsPage = ({
    server,
    id,
    name
}) => {
    const [data, setData] = useState(null);
    // TODO: battle type selector
    const [battleType, setBattleType] = useState(null)

    useEffect(() => {
        fetch(getPlayerStatisticsUrl(server, id))
            .then(response => response.json())
            .then(data => {
                setData(data.data[id]);
            })
            .catch(error => {
                console.log("we got an error")
            })
    }, [server, id])


    if (data) {
        return (
            <>
                <div className="player-statistics-head">
                    <PlayerClanBadge
                        server={server}
                        playerId={id} />
                </div>
                {/* {JSON.stringify(data)} */}
            </>
        )
    }
    else {
        return null
    }

}

export default PlayerStatisticsPage
