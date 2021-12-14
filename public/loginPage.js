const userForm = new UserForm;
userForm.loginFormCallback = (data) => {
    //console.log(data);
  if (ApiConnector.login(data,(data) => console.log(data))) {
    location.reload();
  }
}
