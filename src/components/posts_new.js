import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

const renderField = ({input, label, meta: {touched, error, warning, invalid}}) => (
  <div className={`form-group ${touched && invalid ? 'has-danger' : ''}`}>
    <label>{ label }</label>
    <input type="text" className="form-control" {...input} />
    <div className="text-help">
      {touched ? error : ''}
    </div>
  </div>
)

class PostsNew extends Component {
  //a contextTypes object is defined for each instance created
  //react will look for the properties defined in this object from the parent components until it's found
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    // properties from the form = [title, categories, content]
    this.props.createPost(props)
      .then(() => {
        // blog post has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <Field name='title' label="Title"  component={ renderField }/>
        <Field name='categories' label="Category"  component={ renderField }/>
        <Field name='content' label="Content"  component={ renderField }/>
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

        // <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
        //   <label>Title</label>
        //   <input type="text" className="form-control" {...title} />
        //   <div className="text-help">
        //     {title.touched ? title.error : ''}
        //   </div>
        // </div>

        // <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
        //   <label>Categories</label>
        //   <input type="text" className="form-control" {...categories} />
        //   <div className="text-help">
        //     {categories.touched ? categories.error : ''}
        //   </div>
        // </div>

        // <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
        //   <label>Content</label>
        //   <textarea className="form-control" {...content} />
        //   <div className="text-help">
        //     {content.touched ? content.error : ''}
        //   </div>
        // </div>

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if (!values.categories) {
    errors.categories = 'Enter categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

const InitializeForm =  reduxForm({
  form: 'PostsNewForm',  validate
})(PostsNew);

export default connect(null, { createPost })(InitializeForm);
