import { Component } from 'react'
import PropTypes from 'prop-types'

class Modal extends Component {
  render () {
    return (
      <div className="modal">
        <div className="modal-title">
          <div className="modal-title-text">{this.props.title}</div>
          <i onClick={this.props.closeModal} className="close fas fa-times"></i>
        </div>
        <div className="modal-content">
          {this.props.children}
        </div>
        <div className="modal-footer">
          {this.props.buttons.map(button => button)}
        </div>
        <style jsx>{`
          .modal {
            background-color: white;
            border: 1px solid black;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 200px;
            min-width: 540px;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }
          .modal-title, .modal-footer {
            background-color: #EEE;
            padding: 5px;
          }

          .modal-content {
            padding: 10px;
          }

          .modal-title-text {
            display: inline;
            font-size: 24px;
            font-weight: bold;
            padding: 0 10px;
          }

          .close {
            cursor: pointer;
            float: right;
            line-height: 24px;
          }
        `}</style>
      </div>
    )
  }
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  buttons: PropTypes.arrayOf(PropTypes.node),
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default Modal
