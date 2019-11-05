import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {


  renderStocks = () => {
    return this.props.stocks.map((stock) => {
      return <Stock stock={stock} hotdog={this.props.addToPortfolio}/>
    })
  }

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          this.renderStocks()
        }
      </div>
    );
  }

}

export default StockContainer;
