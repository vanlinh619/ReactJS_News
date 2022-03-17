import React, { Component } from 'react';
import './App.css';
import Home from './pages/Home';
import Header from './pages/Header'
import Footer from './pages/Footer'
import { Route, BrowserRouter } from "react-router-dom";
import About from './pages/About';


class App extends Component {

  state = {
    data: 'APP'
  };

  componentDidMount() {
    this.callBackendAPI()
      // .then(res => this.setState({ data: res.rss }))
      .then(res => {
        var arr = res.rss.channel[0].item
        console.log('rss', arr)
        this.setState({ data: arr })
      })
      .catch(err => console.log(err));
  }
  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    console.log('RSS', body)

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  home = () => {
    return(
      <Home dataFromParent={this.state.data}/>
    )
  }

  render() {
    return (

      <div>
        <Header />
        <BrowserRouter>
          <Route exact path="/" component={this.home} />
          <Route path="/about" component={About} />
        </BrowserRouter>
        <Footer />
        {/* <div dangerouslySetInnerHTML={{ __html: this.state.data }} /> */}
      </div>


    );
  }
}

export default App;