import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './routes/HomePage';
import StatisticsPage from './routes/StatisticsPage';
import MapPage from './routes/MapPage';
import InteractiveMapPage from './routes/InteractiveMapPage';


function App() {
    return (
        <Router>
            <Header />
            <Switch>
                <Route exact path="/"
                    component={HomePage} />
                <Route exact path="/statistics/"
                    component={StatisticsPage} />
                <Route exact path="/statistics/:server/:searchType/:id-:name"
                    component={StatisticsPage} />
                <Route exact path="/maps/"
                    component={MapPage} />
                <Route exact path="/maps/:id"
                    component={MapPage} />
                <Route exact path="/interactive-maps/"
                    component={InteractiveMapPage} />
                <Route exact path="/interactive-map/:id"
                    component={InteractiveMapPage} />

                {/* Catch 404 */}
                <Route>
                    {/* <ErrorPage status={status.STATUS_NOT_FOUND} /> */}
                    <h1>404</h1>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
