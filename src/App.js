import React, { Component } from 'react';
import './App.css';
import list from './AppData';

const isSearched = (searchTerm) => 
  (item) =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: list,
      searchTerm: ''
    };
  }
  onDismiss = (id) => {
    const newList = this.state.list.filter((item) => item.objectID !== id);
    this.setState({
      list: newList
    });
  }
  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }
  render() {
    const {list, searchTerm} = this.state
    return (
      <div className="App">
        <form>
          <input type="text" value={searchTerm} onChange={this.onSearchChange} />
        </form>
        {list.filter(isSearched(searchTerm)).map(item => 
            <div key={item.objectID}>
              <span>
                <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
              </span>
              <span> {item.author}</span>
              <span> {item.num_comments}</span>
              <span> {item.points}</span>
              <button onClick={() => this.onDismiss(item.objectID)}>Dismiss</button>              
            </div>
        )}
      </div>
    );
  }
}

export default App;
