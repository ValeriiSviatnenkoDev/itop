import React from "react";

import Header from "./home-component/Header";
import Main from "./home-component/Main";

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusAuth: true
    }
  }

  componentDidMount() {
    this.setState({
      statusAuth: localStorage.getItem('status')
    })
  }

  render() {
    return(
      <>
        { 
        this.state.statusAuth ? 
          <>
            <Header />
            <Main />
          </>
        : 
          <Main />
        }
      </>
    );
  }

}

export default Home;