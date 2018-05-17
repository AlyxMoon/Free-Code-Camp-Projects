import { Component } from 'react'
import PropTypes from 'prop-types'

class Modal extends Component {
  render () {
    return (
      <div className="modal-page-wrapper">
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
        </div>
        <style jsx>{`
          .modal-page-wrapper {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0,0,0,0.5);
            z-index: 9;
          }

          .modal {
            background-color: white;
            border: 1px solid rgba(0,0,0,0.7);
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 200px;
            min-width: 540px;
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
          }

          .modal-title {
            border-bottom: 1px solid rgba(0,0,0,0.4);
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            padding: 15px 5px;
          }

          .modal-footer {
            border-top: 1px solid rgba(0,0,0,0.4);
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            display: flex;
            justify-content: flex-end;
            padding: 5px 20px;
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
            padding-right: 10px;
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
