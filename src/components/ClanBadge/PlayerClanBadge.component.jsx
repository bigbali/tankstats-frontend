import React, { useEffect, useState } from 'react';
import { getClanBadgeUrl } from '../../queries/queries';
import './PlayerClanBadge.style.scss';

const PlayerClanBadge = ({
    server,
    playerId
}) => {
    const [clanData, setClanData] = useState(null);
    useEffect(() => {
        fetch(getClanBadgeUrl(server, playerId))
            .then(response => response.json())
            .then(data => {
                setClanData(data.data[playerId]);
            })
            .catch(error => {
                console.log("we got an error")
            })
    }, [server, playerId])

    if (clanData) {
        return (
            <div className="clan-badge">
                <span className="clan-badge-player-name">
                    {clanData.account_name}
                </span>
                <img
                    className="clan-badge-emblem"
                    src={clanData.clan.emblems.x195.portal}
                    alt="Clan emblem"
                />
                <div className="clan-badge-aside">
                    <span className="clan-badge-clan-tag">
                        [{clanData.clan.tag}]
                    </span>
                    <span className="clan-badge-clan-role">
                        {clanData.role}
                    </span>
                </div>
            </div>
        )
    }
    else {
        return null
    }
}

export default PlayerClanBadge
