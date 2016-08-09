(function () {
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('../../api/authorApi.js');

var AuthorList = React.createClass({
  //defines what kind of properties need to be passed in to the component
  //and how they react
  propTypes: {
    authors: React.PropTypes.array.isRequired
  },
  render: function () {
    var createAuthorRow = function (author) {
      return (
        <tr key={author.id}>
          <td><Link to="manageAuthor" params={{ id: author.id }}>{ author.id }</Link></td>
          <td>{author.firstname} {author.lastName}</td>
        </tr>
      );
    };

    //props have been passed in from the parent component
    return (
      <table className="table">
        <thead>
          <th>ID</th>
          <th>Name</th>
        </thead>
        <tbody>
          { this.props.authors.map(createAuthorRow, this) }
        </tbody>
      </table>
    );
  }
});

module.exports = AuthorList;

})();
