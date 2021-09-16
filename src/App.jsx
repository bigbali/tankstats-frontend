import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './routes/HomePage';
import StatisticsPage from './routes/StatisticsPage';
import MapsPage from './routes/MapsPage';


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/"
                    component={HomePage} />
                <Route exact path="/statistics/:type/:id"
                    component={StatisticsPage} />
                <Route exact path="/maps/:id"
                    component={MapsPage} />

                {/* Catch 404 */}
                {/* <Route>
                        <ErrorPage status={status.STATUS_NOT_FOUND} />
                    </Route> */}
            </Switch>
        </Router>
    );
}

export default App;
