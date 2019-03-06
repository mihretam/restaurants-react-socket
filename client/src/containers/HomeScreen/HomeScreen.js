import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../store/actions/authentication'
import { withStyles } from '@material-ui/core/styles'
import { TableSimple } from '../../components'
import { activeDealsTableHeaderInitial, activeDealsFieldsInitial,dataTable } from './helpers'
import { localize } from '../../services/'
import styles from './styles'

class HomeScreen extends Component {

  render () {
    const paymentTableHeader = activeDealsTableHeaderInitial.slice()
    const paymentFields = activeDealsFieldsInitial.slice()



    const {classes} = this.props
    return (
      <div className={classes.containerFull}>
        <TableSimple
          size={[12, 12, 12]}
          header={paymentTableHeader}
          data={dataTable}
          fields={paymentFields}
          title={localize('activeDeals')}
          flexWidth
        />
      </div>

    )
  }
}

HomeScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    settings: state.settings,
    auth: state.auth,
    errors: state.errors
  }
}
export default connect(mapStateToProps, {loginUser})(withStyles(styles)(HomeScreen))

