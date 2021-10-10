import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Login from './User/Login.jsx';
import Signup from './User/Signup.jsx';
import ChoiceBox from './Components/ChoiceBox.jsx';
import Graph from './Components/Graph.jsx';
import Navigation from './Components/Navigation.jsx';
import ConversionBox from './Components/ConversionBox.jsx';
import PositionsTable from './Components/PositionsTable.jsx'

// | App
//   |Graph (Graph) (only accesses database?)
//   |StateHolder
//     |ConversionBox
//     |ChoiceBox

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr1: 'USD', //USD
      curr2: 'EUR', //EUR
      value: '1', //your amount
      conversionRate: 2, //test rate, will be overwritten by state change
      converted: '',
      history: '', //your amount * conversionrate
      basecurr: 'USD',
      portfolio: [],
      allRates: {}
    };
    this.curr1Change = this.curr1Change.bind(this);
    this.curr2Change = this.curr2Change.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.getPortfolio = this.getPortfolio.bind(this);
    this.baseCurrChange = this.baseCurrChange.bind(this);
  }

  getPortfolio() {
    axios('/user/getPort')
      .then(res => {
        console.log('getportfolio axios is happening now')
        this.setState({portfolio: res}) //spread state in???
      })
      .then(()=> {
        console.log('this is state', this.state)
      })
      .catch(err => {
        console.log('axios caught in getPortfolio on App.jsx', err)
      })
  }

  componentDidMount() {
    // const x = Promise.resolve(this.setState({ value: event.target.value }));
      axios
        .post('http://localhost:3000/currencyApi', {
          curr1: this.state.curr1,
          curr2: this.state.curr2,
        })
        .then((response) => {
          this.setState({ conversionRate: response.data.info.rate });
          this.setState({ history: response.data.history });
        })
        .catch((error) => {
          console.log('Value change error!!', error, ':(');
        });

  }
  curr1Change(event) {
    // goes to ChoiceBox
    // res.locals.history
    // res.locals.rate
    this.setState({ curr1: event.target.value });
  }

  curr2Change(event) {
    // goes to ChoiceBox
    this.setState({ curr2: event.target.value });
  }

  baseCurrChange(event) {
   this.setState({ basecurr: event.target.value });
  }
  valueChange(event) {
    
    const x = Promise.resolve(this.setState({ value: event.target.value }));
    x.then(() => {
      axios
        .post('http://localhost:3000/currencyApi', {
          curr1: this.state.curr1,
          curr2: this.state.curr2,
        })
        .then((response) => {
          this.setState({ conversionRate: response.data.info.rate });
          this.setState({ history: response.data.history });
        })
        .catch((error) => {
          console.log('Value change error!!', error, ':(');
        });
    });
  }

  render() {
    return (
      <Router>
        <div className="header">
          <div className="topButtons">
            <div className="leftButtons">
              <Link to='/signup'>
                <button
                  className="signup-btn"
                  // onClick={(event) => {
                  //   console.log('trying to send you to singup');
                  //   console.log(this.state);
                  //   this.setState({ currentpage: 'signup' });}}
                >
                  {' '}
                  Signup{' '}
                </button>
              </Link>

              <Link to="/login">
                <button
                  className="login-btn"
                >
                  {' '}
                  Login{' '}
                </button>
              </Link>
            </div>
            <div className="rightButtons">
              <button>Learn More</button>
              <button>Contact Us</button>
            </div>
          </div>
          
      </div>
            <Switch>
              <Route exact path="/">
                <div id="together">
                  <ConversionBox info={this.state} />
                  <ChoiceBox
                    getPortfolio={this.getPortfolio}
                    info={this.state}
                    curr1Change={this.curr1Change}
                    curr2Change={this.curr2Change}
                    valueChange={this.valueChange}
                    baseCurrChange={this.baseCurrChange}
                  />
                  <PositionsTable info={this.state}
                   getPortfolio={this.getPortfolio} />
                  </div>
                <Graph info={this.state} />
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/signup">
                <Signup/>
              </Route>
            </Switch>
      </Router>
    );
  }
}

export default App;