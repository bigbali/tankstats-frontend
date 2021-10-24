import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './routes/HomePage';
import StatisticsPage from './routes/StatisticsPage';
import MapPage from './routes/MapPage';
import StrategicMapPage from './routes/StrategicMapPage';
import LoginPage from './routes/LoginPage';
import Flash from './components/Flash';


function App() {
    return (
        <Router>
            <Flash />
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
                <Route exact path="/strategic-maps/"
                    component={StrategicMapPage} />
                <Route exact path="/strategic-maps/:id"
                    component={StrategicMapPage} />
                <Route path="/login/"
                    component={LoginPage} />

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
