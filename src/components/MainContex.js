import React from 'react';
import PropTypes from 'prop-types';
// Context is made up of two things
// Provider - Single as close to top level as possible
// Consumer - Multiple have multiple consumers

const defaultState = {
  item1: 1,
  item2: 2,
  reducer: function () {},
};
export const MainContext = React.createContext(defaultState);

export class MainContextProvider extends React.Component {
  state = {
    root: {},
  };

  // reducer
  reducer = (ACTION, STATE) => {
    const copyState = { ...this.state };
    switch (ACTION) {
      case 'SET':
        copyState.root = { ...STATE };
        this.setState({
          ...copyState,
        });

        break;
      case 'RESET':        
        copyState.root = { ...STATE };
        this.setState({
          ...copyState,
        });

        break;
      default:
        return this.state;
    }
  };

  render() {
    return (
      <MainContext.Provider
        value={{
          ...this.state,
          reducer: this.reducer,
        }}
      >
        {this.props.children}
      </MainContext.Provider>
    );
  }
}

MainContextProvider.propTypes = {
  children: PropTypes.any,
};
