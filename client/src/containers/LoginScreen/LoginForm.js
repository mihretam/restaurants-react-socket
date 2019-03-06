import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { Button } from '@material-ui/core'
import FormLabel from '@material-ui/core/FormLabel'
import { localize } from '../../services/'
import styles from './styles'

const LoginForm = props => {
  const {classes, userData, onChangeValue, submitAction, errors} = props
  let errorLabel = null
  if (typeof errors.error !== 'undefined') {
    errorLabel = <FormLabel error={true}>{errors.error}</FormLabel>
  }

  return (
    <form onSubmit={submitAction} className={classes.grid}>
      <Typography
        align='center'
        headlineMapping={{display: 'h2'}}
        variant='h5'
      >
        {localize('login')}
      </Typography>

      <TextField
        className={classes.inputRoot}
        name='email'
        type='email'
        label='Email'
        value={userData.email}
        onChange={onChangeValue}
      />

      <TextField
        className={classes.inputRoot}
        name='password'
        type='password'
        label='Password'
        value={userData.password}
        onChange={onChangeValue}
      />

      {errorLabel ? errorLabel : null}
      <div className={classes.buttons}>
        <Button
          type='submit'
          color='primary'
          variant='contained'
        >
          Signin
        </Button>
      </div>
    </form>
  )
}

export default withStyles(styles)(LoginForm)
