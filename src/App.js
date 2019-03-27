import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
// import Pokemon from './components/Pokemon';
import Cocktail from './components/Cocktails';
import Navbar from './components/Navbar';
import SavedCocktails from './components/SavedCocktails';

class App extends Component {
  render() {
    return (
        <div>
            <BrowserRouter>
            <Navbar/>
            {/* <Route path="/pokemon" component={Pokemon}/> */}
            <Switch>
                <Route exact path="/" component={Cocktail}/>
                <Route exact path="/saved" component={SavedCocktails}/>
            </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;