describe("Search Futsal", () => {
  it("searches futsal based on full name", () => {
    cy.login();
    cy.visit("/vendor");

    cy.get("#futsal-name").type("Dhuku");
    cy.getByData("vendor-search-button").click();

    cy.getByData("vendor-list-card-name").should("contain", "Dhuku");

    cy.getByData("vendor-list-card-wrapper").click();
    cy.contains("Dhuku");

    cy.getByData("Review").click();
    cy.contains("MY REVIEW");
    cy.getByData("review-edit-button").click();
    cy.contains("Edit Review");

    cy.get("#review-comment").type(
      "{selectall}{backspace}This is updated review."
    );
    cy.getByData("submit-review").click();
    cy.should("not.contain", "Edit Review");
    cy.getByData("snackbar-item").contains("Review updated successfully");
    cy.getByData("snackbar-item-dismiss").click();

    cy.logout();
    cy.url().should("include", "/login");
  });
});
