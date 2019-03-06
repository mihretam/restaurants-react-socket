import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { loginUser } from '../../store/actions/authentication'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'
import styles from './styles'

class LoginScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        password: '',
        error: {}
      }
    }
    this.handleChangeValue = this.handleChangeValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeValue (e) {
    let inputName = e.target.name
    let inputValue = e.target.value
    this.setState({user: {...this.state.user, [inputName]: inputValue}})
  }

   handleSubmit = (event) => {
    const {user} = this.state
    const {loginUser} = this.props
    event.preventDefault()
      loginUser(user)
  }

  componentDidMount () {
    const {auth, history} = this.props
    if (auth.isAuthenticated) {
      history.push('/home')
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/home')
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      })
    }
  }

  render () {
    const {classes, errors} = this.props
    const {user} = this.state
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <LoginForm userData={user} submitAction={this.handleSubmit} onChangeValue={this.handleChangeValue}
            errors={errors} />
        </Card>
      </div>
    )

  }
}

LoginScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, {loginUser})(withRouter(withStyles(styles)(LoginScreen)))