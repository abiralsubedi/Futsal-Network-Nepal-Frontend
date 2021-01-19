describe("Authentication", () => {
  it("successfully logs in", () => {
    cy.visit("/");
    cy.waitForReact();

    cy.url().should("include", "/login");
    cy.react("CustomTextField", { props: { id: "username" } }).type(
      Cypress.env("username")
    );

    cy.react("TextField", { props: { id: "password" } }).type(
      `${Cypress.env("password")}{enter}`
    );
    cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    cy.contains("Hello");

    cy.getByData("profile-menu-btn").click();
    cy.getByData("profile-menu-logout").click();
    cy.url().should("include", "/login");
  });
});
