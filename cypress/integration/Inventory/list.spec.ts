describe("Inventory", () => {
  context("List Table", () => {
    beforeEach(() => {
      cy.login();
      cy.visit("/panel/inventory");
    });

    it("should render datagrid and show items", () => {
      cy.intercept(Cypress.env("apiUrl") + "/item**").as("items");

      cy.get(".inovua-react-toolkit-text-input").first().type("002-0053");

      cy.wait("@items");

      cy.get(".InovuaReactDataGrid__row").should("have.length", 2);
    });
  });
});
