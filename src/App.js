import { Switch, Route } from "react-router-dom";
import { Devices, Home, Login, Users } from "./pages";
import { PrivateRoute } from "./components";

function App() {
    return (
        <div className="App">
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Switch>
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path="/" component={Home} />
                <PrivateRoute exact path="/dashboard" component={Home} />
                <PrivateRoute path="/devices" component={Devices} />
                <PrivateRoute path="/users" component={Users} />
            </Switch>
        </div>
    );
}

export default App;
