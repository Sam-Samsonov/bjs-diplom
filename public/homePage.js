const logoutButton = new LogoutButton;
logoutButton.action = () => {
  ApiConnector.logout(data => {
    if (data.success === true) {
      setTimeout(() => document.location.reload(), 500);
    }
  })
}

ApiConnector.current(data => {
  if (data.success === true) {
    ProfileWidget.showProfile(data.data)
  }
})

const ratesBoard = new RatesBoard;
setInterval(() => {
ApiConnector.getStocks(data => {
  ratesBoard.clearTable();
  ratesBoard.fillTable(data.data);
})
}, 1000)

const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (data) => {
    if (data.success === true) {
      ProfileWidget.showProfile(data.data);
      moneyManager.setMessage(true, 'Пополнение успешно выполнено)');
    } else {
      moneyManager.setMessage(false, data.error);
    }
  })
}

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (data) => {
    if (data.success === true) {
      ProfileWidget.showProfile(data.data);
      moneyManager.setMessage(true, 'Конвертирование успешно выполнено)');
    } else {
      moneyManager.setMessage(false, data.error);
    }
  })
}

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (data) => {
    if (data.success === true) {
      ProfileWidget.showProfile(data.data);
      moneyManager.setMessage(true, 'Трансфер успешно выполнен)');
    } else {
      moneyManager.setMessage(false, data.error);
    }
  })
}

const favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites(data => {
  if (data.success === true) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(data.data);
    moneyManager.updateUsersList(data.data);
  }
})

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (data) => {
    if (data.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(data.data);
      moneyManager.updateUsersList(data.data);
    } else {
      favoritesWidget.setMessage(false, data.error);
    }
  })
}

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (data) => {
    if (data.success === true) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(data.data);
      moneyManager.updateUsersList(data.data);
    } else {
      favoritesWidget.setMessage(false, data.error);
    }
  })
}
