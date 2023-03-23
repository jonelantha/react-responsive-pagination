import React, { Component } from 'react';
import ResponsivePagination from 'react-responsive-pagination';

export default class BootstrapLiveDemoClass extends Component {
  state = {
    totalPages: 120,
    currentPage: 1,
  };

  handlePageChange(page) {
    this.setState({ currentPage: page });
    // ... do something with `page`
  }

  render() {
    return (
      <ResponsivePagination
        total={this.state.totalPages}
        current={this.state.currentPage}
        onPageChange={page => this.handlePageChange(page)}
        {...this.props}
      />
    );
  }
}
