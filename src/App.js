import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'black elvis',
    url: 'koolkeith.com',
    author: 'kool keith',
    num_comments: 7,
    points: 999999,
    objectID: 123456
  },
  {
    title: 'to live and die in l.a.',
    url: 'latimes.com',
    author: 'wang chung',
    num_comments: 213,
    points: 1988,
    objectID: 654321
  }
];

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      list: list,
    };
  }
  render() {
    return (
      <div className="App">
        {this.state.list.map(item => 
            <div key={item.objectID}>
              <span>
                <a href={item.url}>{item.title}</a>
              </span>
              <span> {item.author}</span>
              <span> {item.num_comments}</span>
              <span> {item.points}</span>
            </div>
        )}
      </div>
    );
  }
}

export default App;
