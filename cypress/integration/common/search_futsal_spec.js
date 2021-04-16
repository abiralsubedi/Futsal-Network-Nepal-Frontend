describe("Search Futsal", () => {
  it("searches futsal based on full name", () => {
    cy.login();
    cy.visit("/vendor");

    cy.get("#futsal-name").type("Dhuku");
    cy.getByData("vendor-search-button").click();

    cy.getByData("vendor-list-card-name").should("contain", "Dhuku");

    cy.getByData("vendor-list-card-wrapper").click();
    cy.contains("Dhuku");
    cy.logout();
    cy.url().should("include", "/login");
  });
});
