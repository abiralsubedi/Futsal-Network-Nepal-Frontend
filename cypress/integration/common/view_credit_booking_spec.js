describe("Credit and Booking Page", () => {
  it("views credit and booking", () => {
    cy.login();
    cy.visit("/");

    cy.getByData("profile-menu-btn").click();
    cy.getByData("profile-menu-personal-info").click();
    cy.url().should("include", "/profile");

    cy.getByData("Credit").click();
    cy.contains("Credit History");

    cy.getByData("Booking").click();
    cy.contains("Booking Date");

    cy.logout();
    cy.url().should("include", "/login");
  });
});
