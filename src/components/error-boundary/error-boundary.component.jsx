import React, { Component } from 'react';
import NotFound from '../not-found/not-found.component';

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error
    return {
      hasErrored: true,
    };
  }

  componentDidCatch(error, info) {
    // console.log(error);
  }

  handleRemoveError = () => {
    this.setState({
      hasErrored: false,
    });
  };

  render() {
    if (this.state.hasErrored) return <NotFound text="Đã xảy ra sự cố ..." />;
    return this.props.children;
  }
}

export default ErrorBoundary;
