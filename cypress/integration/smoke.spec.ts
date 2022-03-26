describe("Smoke Test", () => {
  it("Should load and can be logged in", () => {
    cy.intercept("POST", "https://ts.digitalphocus.ir/api/employee/login").as("login");
    cy.visit("/");
    cy.get("input[name=username]").type("employee");
    cy.get("input[name=password]").type("employee{enter}");

    cy.wait("@login");

    cy.url().should("contain", "panel");
  });

  context("Logged In", () => {
    beforeEach(() => {
      cy.intercept("GET", "https://ts.digitalphocus.ir/api/notification?unseen=true").as("notification");
      cy.login("employee", "employee");
      cy.visit("/panel");
    });

    it("Should be able to logout", () => {
      cy.get("#open-drawer-button").click();
      cy.get("#logout-button").click();
      cy.get("button").contains("Yes").click();
      cy.url().should("contain", "login");
    });

    it("Should get latest notifications", () => {
      cy.get("button[title=Notifications]").click();
      cy.wait("@notification", { timeout: 5000 });

      cy.get("#notification-menu .MuiLinearProgress-root").should("not.exist");
    });
  });
});
