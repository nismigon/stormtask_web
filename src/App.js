import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Authentication from "./components/pages/Authentication";
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/" component={Authentication} />
      </Switch>
    </Router>
  )
}

export default App;
