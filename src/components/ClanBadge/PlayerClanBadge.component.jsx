import React, { useEffect, useState } from 'react';
import { getClanBadgeUrl } from '../../queries/queries';
import getClanPosition from '../../util/getClanPosition';
import './PlayerClanBadge.style.scss';

const PlayerClanBadge = ({
    server,
    playerId
}) => {
    const [clanData, setClanData] = useState(null);

    const getDate = (epoch) => {
        const rawDate = new Date(clanData.joined_at * 1000);

        const year = rawDate.getFullYear().toString();
        let month = rawDate.getMonth().toString();
        let day = rawDate.getDate().toString();

        if (month.length === 1)
            month = "0" + month;

        if (day.length === 1)
            day = "0" + day;

        const date = `${day}/${month}/${year}`

        return date
    }

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
                <div className="clan-badge-main">
                    <img
                        className="clan-badge-emblem"
                        src={clanData.clan.emblems.x195.portal}
                        alt="Clan emblem"
                    />
                    <div className="clan-badge-aside">
                        <span className="clan-badge-clan-tag"
                            style={{ color: clanData.clan.color }}>
                            [{clanData.clan.tag}]
                        </span>
                        <span className="clan-badge-clan-role">
                            {getClanPosition(clanData.role)}
                        </span>
                    </div>
                </div>
                <span className="joined-date">
                    Joined: {getDate(clanData.joined_at)}
                </span>
            </div>
        )
    }
    else {
        return null
    }
}

export default PlayerClanBadge
