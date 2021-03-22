import React, {Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import NotFound from './components/pages/NotFound';
import User from './components/users/User';
import './App.css';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App = () => {

  //  async componentDidMount() {
  //    this.setState({loading: true});   //to set state
  //    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);

  //    this.setState({users:res.data, loading: false});  //after we get response remove spinner
  //  }

  
    //switch is for defining routes and setting their paths 
    return ( 
      <GithubState>
        <AlertState>     
      <Router>
      <div className="App">
        <Navbar/>
        <div className='container'>
        <Alert/>
        <Switch>
          <Route exact path='/' component = {Home}/>
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' component = {User}/>
          <Route component={NotFound}/>
        </Switch>
        </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
    );
}

export default App;