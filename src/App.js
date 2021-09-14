import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authentication from "./components/pages/Authentication";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Authentication} />
      </Switch>
    </Router>
  )
}

export default App;
