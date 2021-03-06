import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions/index'
// import { Link } from 'react-router'
import { Link } from 'react-router-dom'

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  componentWillMount() {
    this.props.fetchPost(this.props.match.params.id)
  }

  onDeleteClick() {
    this.props.deletePost(this.props.match.params.id)
    // .then( () => { this.context.router.push('/') } )
    .then( () => { this.props.history.push('/') } )
  }

  render() {
    const { post } = this.props
    if(!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to='/'>Back To Index</Link>
        <h3>{ post.title }</h3>
        <h6>Categories: { post.categories }</h6>
        <p>{ post.content }</p>
        <button className='btn btn-danger pull-xs-right' onClick={ this.onDeleteClick.bind(this) }>Delete</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post : state.posts.post }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)
