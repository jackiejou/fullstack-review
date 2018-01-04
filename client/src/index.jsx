import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
    }
    console.log(this.state.repos);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: '/repos',
      data: {username: term},
      type: 'post',
      error: (err) => {
        console.log('error');
      },
      success: (data) => {
        console.log('success');
        // this.setState({repos: data});
        $.ajax('/repos').done(results => {
          this.setState({repos: results});
        });
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
