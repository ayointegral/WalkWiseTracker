import { Switch, Route } from "wouter";
import Dashboard from "./pages/Dashboard";
import ActiveWalk from "./pages/ActiveWalk";

function App() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/walk" component={ActiveWalk} />
      <Route>404 Page Not Found</Route>
    </Switch>
  );
}

export default App;
