import { Component } from 'react'
import PropTypes from 'prop-types'

import BarListItem from './BarListItem'
import IntoxicationLevel from './IntoxicationLevel'
import Modal from './Modal'

class BarList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showModal: false,
      plannedIntoxicationLevel: 0
    }

    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.setPlannedIntoxicationLevel = this.setPlannedIntoxicationLevel.bind(this)
    this.going = this.going.bind(this)
  }

  openModal (modalContent, dateGoing, barId) {
    this.setState({ showModal: true, modalContent, dateGoing, barId })
  }

  closeModal () {
    this.setState({ showModal: false })
  }

  setPlannedIntoxicationLevel (level) {
    this.setState({ plannedIntoxicationLevel: level })
  }

  going (goingStatus) {
    this.props.setStatusGoing(
      this.state.dateGoing,
      this.state.barId,
      goingStatus,
      this.state.plannedIntoxicationLevel
    )
    this.setState({ plannedIntoxicationLevel: 0 })
    this.closeModal()
  }

  render () {
    let buttons = []
    buttons.push((
      <button key='modal-button-1' onClick={() => { this.going(true) }}>Yes</button>
    ))
    buttons.push((
      <button key='modal-button-2' onClick={() => { this.going(false) }}>No</button>
    ))

    return (
      <div className="bar-list">
        { this.props.bars.map(bar => (
          <BarListItem
            key={bar.id}
            bar={bar}
            onCalendarClick={this.openModal} />
        ))}
        { this.state.showModal && (
          <Modal title="Set Bar Attendance Status" closeModal={this.closeModal} buttons={buttons}>
            { this.state.modalContent }
            <h5>Optional: How drunk do you plan on getting?</h5>
            <IntoxicationLevel
              level={this.state.plannedIntoxicationLevel}
              selectable={true}
              onClickIcon={this.setPlannedIntoxicationLevel}
            />
          </Modal>
        )}
      </div>
    )
  }
}

BarList.propTypes = {
  bars: PropTypes.array.isRequired,
  setStatusGoing: PropTypes.func.isRequired
}

export default BarList
