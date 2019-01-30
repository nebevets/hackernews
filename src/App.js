import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'black elvis',
    url: 'https://en.wikipedia.org/wiki/Kool_Keith',
    author: 'kool keith',
    num_comments: 7,
    points: 999999,
    objectID: 123456
  },
  {
    title: 'to live and die in l.a.',
    url: 'http://www.latimes.com',
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
      list
    };
    this.onDismiss.bind(this);
  }
  onDismiss(id){
    console.log(this.state.list[0].objectID, id);
    const newList = this.state.list.filter((item) => item.objectID !== id);
    console.log(newList);
    this.setState({list: newList});
  }
  render() {
    return (
      <div className="App">
        {this.state.list.map(item => 
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
