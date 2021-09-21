import React, { useEffect, useState } from 'react';
import { getClanBadgeUrl } from '../../queries/queries';
import getClanPosition from '../../util/getClanPosition';
import './PlayerClanBadge.style.scss';
import { NavLink } from 'react-router-dom';

const PlayerClanBadge = ({
    server,
    playerId,
    fallbackName
}) => {
    const [data, setdata] = useState(null);

    const getDate = (epoch) => {
        const rawDate = new Date(data.joined_at * 1000);

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
                setdata(data.data[playerId]);
            })
            .catch(error => {
                console.log("we got an error")
            })
    }, [server, playerId])

    if (data) {
        return (
            <NavLink to={`/statistics/${server}/clan/${data.clan.clan_id}-${data.clan.tag}`}
                className="clan-badge-wrapper">
                <div className="clan-badge">
                    <span className="clan-badge-player-name">
                        {data.account_name}
                    </span>
                    <div className="clan-badge-main">
                        <img
                            className="clan-badge-emblem"
                            src={data.clan.emblems.x195.portal}
                            alt="Clan emblem"
                        />
                        <div className="clan-badge-aside">
                            <span className="clan-badge-clan-tag"
                                style={{ color: data.clan.color }}>
                                [{data.clan.tag}]
                            </span>
                            <span className="clan-badge-clan-role">
                                {getClanPosition(data.role)}
                            </span>
                        </div>
                    </div>
                    <span className="joined-date">
                        Joined: {getDate(data.joined_at)}
                    </span>
                </div>
            </NavLink>
        )
    }

    return (
        <div className="clan-badge">
            <span className="clan-badge-player-name">
                {fallbackName}
            </span>
        </div>
    )
}

export default PlayerClanBadge
