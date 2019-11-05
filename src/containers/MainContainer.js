import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    allStocks: [],
    stocks: [],
    portfolioStocks: [],
    sortByName: true,
    sortByPrice: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(data => {
      this.setState({
        allStocks: data,
        stocks: data
      })
    })
  }

  addToPortfolio = (id) => {
    const newStock = this.findStockToAdd(id)
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, newStock]
    })
  }
  
  sortStocksByName = () => {
    
    const sortedStocks = [...this.state.stocks].sort((stock1, stock2) => {
      if (stock1.name > stock2.name){
        return 1
      } else if (stock1.name < stock2.name){
        return -1
      } else {
        return 0
      }
    })
    this.setState({
      stocks: sortedStocks
    })
  }

  sortStocksByPrice = () => {
    const sortedStocks = [...this.state.stocks].sort((stock1, stock2) => {
      return stock1.price - stock2.price
    })
    this.setState({
      stocks: sortedStocks
    })
  }
  

  findStockToAdd = (id) => {
    return this.state.stocks.find((stock) => {
      return stock.id === id
    })
  }

  filterStocks = (event) => {
    const filteredStocks = [...this.state.allStocks].filter((stock) => {
      return stock.type === event.target.value
    })
    this.setState({
      stocks: filteredStocks
    })
  }

  removeStockFromPortfolio = (id) => {
    const stocks = this.state.portfolioStocks.filter((stock) => {
      return stock.id !== id
    })
    this.setState({
      portfolioStocks: stocks
    })
  }

  render() {
    // console.log(this.state.stocks)
    // console.log(this.sortStocksByPrice())
    return (
      <div>
        <SearchBar nameSort={this.sortStocksByName} priceSort={this.sortStocksByPrice} filter={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.stocks} addToPortfolio={this.addToPortfolio}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.state.portfolioStocks} removeStockFromPortfolio={this.removeStockFromPortfolio}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
