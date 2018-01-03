import React from 'react';
import moment from 'moment';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Owner</th>
          <th>Repo</th>
          <th>Last Updated</th>
        </tr>
      </thead>
      <tbody>
      {props.repos.slice(0, 25).map((repo, index) =>
        <tr>
          <td>{index + 1}</td>
          <td>{repo.owner}</td>
          <td><a href={repo.htmlurl}>{repo.name}</a></td>
          <td>{moment(repo.updated).format("MMMM Do YYYY, h:mm a")}</td>
        </tr>
      )}
      </tbody>
    </table>
  </div>
)

export default RepoList;
