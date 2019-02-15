import React, { Component } from 'react';
import './App.css';
//import list from './AppData';

const DEFAULT_QUERY = 'javascript';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;

const isSearched = (searchTerm) => 
  (item) =>
    !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());

const Button = ({onClick, className = '', children}) => 
  <button
    onClick={onClick}
    className={className}
    type="button">
    {children}  
  </button>

const Search = ({value, onChange, children}) =>
  <form>
    {children} <input type="text" value={value} onChange={onChange} />
  </form>

const Table = ({list, pattern, onDismiss}) =>
  <div>
    {list.filter(isSearched(pattern)).map(item => 
      <div key={item.objectID}>
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
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopstories(searchTerm);
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
    const { searchTerm, result } = this.state
    if (!result) { return null; }
    return (
      <div className="App">
        <Search value={searchTerm} onChange={this.onSearchChange}>
          <label>search titles</label>
        </Search>
        <Table
          list={result.hits}
          pattern={searchTerm}
          onDismiss={this.onDismiss} />
      </div>
    );
  }
}

export default App;