const logoutButton = new LogoutButton;
logoutButton.action = (logout) => {
  if (ApiConnector.logout(logout => console.log(logout))) {
    location.reload();
    return logout;
  }
}
