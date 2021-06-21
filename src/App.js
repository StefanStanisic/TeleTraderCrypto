import React, { Fragment } from 'react';
import NavigationBar from './components/navbar/navbar.componet';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Fragment>
      <NavigationBar />
      <div className="App">
        <h1>Hello</h1>
      </div>
    </Fragment>
  );
}

export default App;
