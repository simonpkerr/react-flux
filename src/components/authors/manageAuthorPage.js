(function () {
  'use strict';

  var React = require('react');
  var Router = require('react-router');
  var AuthorForm = require('./authorForm');
  var AuthorActions = require('../../actions/authorActions');
  var AuthorStore = require('../../stores/authorStore');
  var toastr = require('toastr');

  var ManageAuthorPage = React.createClass({
    mixins: [
      Router.Navigation
    ],
    statics: {
      willTransitionFrom: function (transition, component) {
        //if the form has been touched and the user confirms they want to leave the page
        //then leave, otherwise abort the transition
        if (component.state.dirty && !confirm('leave without saving?')) {
          transition.abort();
        }
      }
    },
    componentWillMount: function () {
      //called before the component is mounted
      //calling setState will not cause a re-render
      //if there is an authorId in the url, use that id to get the author
      //and set state

      var authorId = this.props.params.id;
      if (authorId) {
        this.setState({
          //uses AuthorStore to access the authorApi
          author: AuthorStore.getAuthorById(authorId)
        });
      }
    },
    getInitialState: function () {
      return {
        author: { id: '', firstName: '', lastName: '' },
        errors: {},
        dirty: false
      };
    },
    authorFormIsValid: function () {
      var valid = true;
      this.state.errors = {};

      if (this.state.author.firstName.length < 3){
        this.state.errors.firstName = 'first name too short';
        valid = false;
      }

      if (this.state.author.lastName.length < 3){
        this.state.errors.lastName = 'last name too short';
        valid = false;
      }

      this.setState({errors: this.state.errors});

      return valid;

    },
    setAuthorState: function (event) {
      this.setState({dirty: true});
      var field = event.target.name;
      var value = event.target.value;
      this.state.author[field] = value;

      return this.setState({author: this.state.author});
    },
    saveAuthor: function (event) {
      event.preventDefault();

      if (!this.authorFormIsValid()) {
        return;
      }

      //calls the dispatcher to emit an action to create an author
      if (this.state.author.id) {
        AuthorActions.updateAuthor(this.state.author);
      } else {
        AuthorActions.createAuthor(this.state.author);
      }

      this.setState({dirty: false});
      toastr.success('Author saved');
      this.transitionTo('authors');


    },
    render: function() {
      return (
        <div>
          <AuthorForm
            author={this.state.author}
            onChange={this.setAuthorState}
            onSave={this.saveAuthor}
            errors={this.state.errors}
          />

        </div>

      );
    }
  });

  module.exports = ManageAuthorPage;

})();
