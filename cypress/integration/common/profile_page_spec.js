describe("Profile Page", () => {
  it("updates profile", () => {
    cy.login();
    cy.visit("/");
    cy.waitForReact();

    cy.getByData("profile-menu-btn").click();
    cy.getByData("profile-menu-personal-info").click();
    cy.url().should("include", "/profile");

    cy.get("#fullName").type("{selectall}{backspace}Bishal Rana");
    cy.getReact("CustomTextField", { props: { id: "fullName" } })
      .getProps("value")
      .should("eq", "Bishal Rana");
    cy.get("#fullName").should("have.attr", "value", "Bishal Rana");

    cy.getByData("basic-info-save").click();
    cy.getByData("snackbar-item").contains("Profile Updated Successfully");
    cy.getByData("snackbar-item-dismiss").click();

    cy.logout();
    cy.url().should("include", "/login");
  });
});
