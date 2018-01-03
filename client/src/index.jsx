import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: this.props.data,
    }

  }

  search (term) {
    console.log(`${term} was searched`);
    $.post('/repos', {handle: term}, (data) => {
      this.setState({repos: data});
    })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

$.ajax('/repos').done(results => {
  console.log(results);
  ReactDOM.render(<App data={results}/>, document.getElementById('app'));
});
