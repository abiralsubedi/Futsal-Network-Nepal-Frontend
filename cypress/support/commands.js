// add login state
Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "https://fyp-node-dev.herokuapp.com/login",
    body: {
      username: Cypress.env("username"),
      password: Cypress.env("password")
    }
  }).then(authRes => {
    window.localStorage.setItem("token", authRes.body.token);
    cy.request({
      method: "GET",
      url: "https://fyp-node-dev.herokuapp.com/profile",
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem("token")}`
      }
    }).then(profRes =>
      window.localStorage.setItem("profile", JSON.stringify(profRes.body))
    );
  });
});

// add logout state
Cypress.Commands.add("logout", () => {
  cy.clearLocalStorage();
  cy.window()
    .its("__store__")
    .then(store => {
      store.dispatch({ type: "LOGOUT_SUCCESS" });
      cy.visit("/login");
    });
    cy.contains('Futsal Network Nepal App')
});

// add data-cy selector
Cypress.Commands.add("getByData", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args);
});

// add data-cy like selector
Cypress.Commands.add("getByDataLike", (selector, ...args) => {
  return cy.get(`[data-cy*=${selector}]`, ...args);
});
