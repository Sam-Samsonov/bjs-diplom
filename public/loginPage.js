const userForm = new UserForm;

userForm.loginFormCallback = (data) => {
  ApiConnector.login(data,(data) => {
    if (data.success === false) {
      userForm.setLoginErrorMessage(data.error);
    } else {
      setTimeout(() => document.location.reload(), 500);
    }
  })
}

userForm.registerFormCallback = (data) => {
  ApiConnector.register(data,(data) => {
    if (data.success === false) {
      userForm.setRegisterErrorMessage(data.error);
    } else {
      setTimeout(() => document.location.reload(), 500);
    }
  })
}
