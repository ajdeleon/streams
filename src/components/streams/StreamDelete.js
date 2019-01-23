import React from 'react'
import Modal from '../Modal'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchStream, deleteStream } from '../../actions/'
import history from '../../history.js'

class StreamDelete extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  renderActions() {
    const { id: streamId } = this.props.match.params
    return (
      <>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(streamId)}
        >
          Delete
        </button>
        <Link to={'/'} className="ui button">
          Cancel
        </Link>
      </>
    )
  }

  renderContent() {
    if (!this.props.stream) {
      return 'Are you sure?'
    }

    return `Are you sure you want to delete: "${this.props.stream.title}"`
  }

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')}
      />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
}

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete)
