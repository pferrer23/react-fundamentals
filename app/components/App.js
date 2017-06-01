var React = require('react');
var Popular = require('./Popular');
var Nav = require('./Nav');
var Home = require('./Home');
var Battle = require('./Battle');
var Results = require('./Results');
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/popular" component={Popular} />
            <Route exact path="/battle" component={Battle} />
            <Route path="/battle/Results" component={Results} />
            <Route render={function () {
              return <p>NOT FOUND!</p>
            }} />
          </Switch>
        </div>
      </Router>
    )
  }
}
module.exports = App;