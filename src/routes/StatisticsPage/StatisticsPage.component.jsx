import { useParams } from 'react-router-dom';
import StatisticsIndexPage from './StatisticsIndexPage';
import PlayerStatisticsPage from './PlayerStatisticsPage';
import ClanStatisticsPage from './ClanStatisticsPage';
import './StatisticsPage.style.scss';

const StatisticsPage = () => {
    const urlParams = useParams();
    const { server, searchType, id, name } = urlParams;

    let page = null;

    if (!server && !searchType && !id && !name) {
        page = <StatisticsIndexPage />
    }
    else if (server && searchType && id && name) {
        if (searchType === "player") {
            page = <PlayerStatisticsPage
                server={server}
                id={id}
                name={name}
            />
        }
        else {
            page = <ClanStatisticsPage
                server={server}
                id={id}
                name={name}
            />
        }
    }

    return (
        <main className="statistics-page">
            {page}
        </main>
    )
}

export default StatisticsPage
