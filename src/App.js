import React, { Component } from 'react';
import './App.css';
//import list from './AppData';

const DEFAULT_QUERY = 'javascript';
const DEFAULT_PAGE = 0;
const DEFAULT_HPP = 5;

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage='

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

/*const PageControl = ({page, term, fetch}) =>
  <span>
    {`page ${page + 1} of 100`}
    { page
      ? <Button onClick={() => fetch(term, page - 1)}>Previous</Button>
      : null
    }
    <Button onClick={() => fetch(term, page + 1)}>Next</Button>
  </span>*/

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
      results: null,
      searchKey: '',
      searchTerm: DEFAULT_QUERY,
    };
  }
  setSearchTopstories = (result) => {
    const { hits, page } = result;
    const { searchKey, results} = this.state;
    const oldHits = results && results[searchKey]
      ? this.state.results[searchKey].hits
      : [];
    const updatedHits = [
      ...oldHits,
      ...hits
    ];
    this.setState({ 
      results: {
        ...results,
        [searchKey]: { hits: updatedHits, page },
      }
    });
  }
  fetchSearchTopstories = (searchTerm, page) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}&${PARAM_HPP}${DEFAULT_HPP}`)
      .then(response => response.json())
      .then(result => this.setSearchTopstories(result));
  }
  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
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
    this.setState({searchKey: searchTerm});
    this.fetchSearchTopstories(searchTerm, DEFAULT_PAGE);
    event.preventDefault();
  }
  render() {
    const { searchTerm, results, searchKey } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
    return (
      <div className="App">
        <div className="page">
          <div className="interactions">
            <Search value={searchTerm} onChange={this.onSearchChange} onSubmit={this.onSearchSubmit}>
              <label>search titles</label>
            </Search>
            <Button onClick={() => this.fetchSearchTopstories(searchKey, page + 1)}>
              More
            </Button>
          </div>
          <div className="interactions">
              <Table
                list={list}
                onDismiss={this.onDismiss}
              />
          </div>
        </div>
      </div>
    );
  }
}

export default App;