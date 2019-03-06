import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import Typography from '@material-ui/core/Typography'
import { localize } from '../../services/'
import FormLabel from '@material-ui/core/FormLabel/FormLabel'

class RegistrationForm extends Component {
  componentDidMount () {
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.props.userData.password) {
        return false
      }
      return true
    })
  }

  render () {
    const {classes, userData, errors, onChangeValue, submitAction} = this.props
    let errorLabel = null
    if (typeof errors.error !== 'undefined') {
      errorLabel = <FormLabel error={true} className={classes.message}>{errors.error}</FormLabel>
    }
    return (

      <ValidatorForm
        ref='form'
        onSubmit={submitAction}
        onError={errors => console.log(errors)}
        className={classes.grid}
      >
        <Typography
          align='center'
          headlineMapping={{display: 'h2'}}
          variant='h5'
        >
          {localize('register')}
        </Typography>
        <TextValidator
          label={localize('email')}
          onChange={
            onChangeValue
          }
          name='email'
          value={userData.email}
          validators={['required', 'isEmail']}
          errorMessages={['this field is required', 'email is not valid']}
        />
        <TextValidator
          label={localize('fullName')}
          onChange={
            onChangeValue
          }
          name='fullName'
          value={userData.fullName}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label={localize('password')}
          onChange={
            onChangeValue
          }
          name='password'
          type='password'
          value={userData.password}
          validators={['required']}
          errorMessages={['this field is required']}
        />
        <TextValidator
          label={localize('repeatPassword')}
          onChange={
            onChangeValue
          }
          name='repeatPassword'
          type='password'
          value={userData.repeatPassword}
          validators={['isPasswordMatch', 'required']}
          errorMessages={['password mismatch', 'this field is required']}
        />
        {errorLabel ? errorLabel : null}
        <div className={classes.buttons}>
          <Button
            type='submit'
            color='primary'
            variant='contained'
          >
            {localize('submit')}
          </Button>

        </div>
      </ValidatorForm>

    )
  }
}


export default withRouter(RegistrationForm)
