(function () {
'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var AuthorApi = require('../../api/authorApi.js');
var AuthorActions = require('../../actions/authorActions');
var toastr = require('toastr');

var AuthorList = React.createClass({
  //defines what kind of properties need to be passed in to the component
  //and how they react
  propTypes: {
    authors: React.PropTypes.array.isRequired
  },
  deleteAuthor: function (id, event) {
    event.preventDefault();
    AuthorActions.deleteAuthor(id);
    toastr.success('Deleted author');
  },
  render: function () {
    var createAuthorRow = function (author) {
      return (
        <tr key={author.id}>
          <td><Link to="manageAuthor" params={{ id: author.id }}>{ author.id }</Link></td>
          <td>{author.firstName} {author.lastName}</td>
          <td><a onClick={this.deleteAuthor.bind(this, author.id)}>Delete</a></td>
        </tr>
      );
    };

    //props have been passed in from the parent component
    return (
      <table className="table">
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th></th>
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
