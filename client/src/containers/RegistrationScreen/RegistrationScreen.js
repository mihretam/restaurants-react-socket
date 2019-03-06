import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import RegistrationForm from './RegistrationForm'
import styles from './styles'
import { registerUser } from '../../store/actions/authentication'

class RegistrationScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        fullName: '',
        password: '',
        repeatPassword: '',
        errorMessage: ''
      }
    }
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillMount () {
    const {auth, history} = this.props
    if (auth.isAuthenticated) {
      history.push('/home')
    }
  }

  handleChangeValue (e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    this.setState({user: {...this.state.user, [inputName]: inputValue}})
  }

  handleSubmit = () => {
    const {history, registerUser} = this.props
    const role = 'Admin'
    const user = {...this.state.user, role}
    registerUser(user, history)
  }

  render () {
    const {classes,errors} = this.props
    const {user} = this.state
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <RegistrationForm userData={user} classes={classes} submitAction={this.handleSubmit}
            onChangeValue={this.handleChangeValue} errors={errors} />
        </Card>
      </div>
    )
  }

}

RegistrationScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(
  mapStateToProps,
  {registerUser}
)(withStyles(styles)(RegistrationScreen))

