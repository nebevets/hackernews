import React, { Component } from 'react';
import './App.css';
//import list from './AppData';

const DEFAULT_QUERY = 'javascript';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

/*const isSearched = (searchTerm) => 
  (item) =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());*/

const Button = ({onClick, className = '', children}) => 
  <button
    onClick={onClick}
    className={className}
    type="button">
    {children}  
  </button>

const Search = ({value, onChange, onSubmit, children}) =>
  <form onSubmit={onSubmit}>
    {children}
    <input type="text" value={value} onChange={onChange} />
    <button type="submit">
      Submit
    </button>
  </form>

const Table = ({list, onDismiss}) =>
  <div>
    {list.map(item => 
      <div key={item.objectID} className="tableRow">
        <span>
          <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
        </span>
        <span> {item.author}</span>
        <span> {item.num_comments}</span>
        <span> {item.points}</span>
        <Button onClick={() => onDismiss(item.objectID)}>
          Dismiss
        </Button>              
      </div>
      )
    }
  </div>

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }
  setSearchTopstories = (result) => {
    this.setState({ result });
  }
  fetchSearchTopstories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
  }
  onDismiss = (id) => {
    const isNotId = item => item.objectID !== id;
    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result , hits: updatedHits}
    });
  }
  onSearchChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    });
  }
  onSearchSubmit = (event) => {    
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
    event.preventDefault();
  }
  render() {
    const { searchTerm, result } = this.state
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
          <label>search titles</label>
        </Search>
        { result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss} />
        }
      </div>
    );
  }
}

export default App;