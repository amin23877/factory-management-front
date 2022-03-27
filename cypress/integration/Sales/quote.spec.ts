describe("Quote", () => {
  beforeEach(() => {
    cy.fixture("auth").then((data) => {
      cy.login(data.username, data.password);
    });
  });

  it("Should create a Quote", () => {
    cy.intercept("https://ts.digitalphocus.ir/api/item?startsWithno=002-0053").as("get-item");
    cy.intercept("POST", "https://ts.digitalphocus.ir/api/quote").as("quote");
    cy.intercept("POST", "https://ts.digitalphocus.ir/api/document/**").as("document");

    cy.visit("/panel/sales");
    cy.get("#top-menu-button").click();
    cy.get("#top-menu-list").contains("Quotes").click();
    cy.get("button").contains("Add Quote").click();
    cy.get("button").contains("Add Group").click();

    cy.get(".group-line").should("have.length", 1);
    cy.get(".group-line").first().get(".group-collapsible").click();
    cy.get("button").contains("Add Device").click();

    cy.get("input[placeholder=Item]").type("002-0053");
    cy.wait("@get-item");
    cy.get(".MuiAutocomplete-popper").get("li").contains("002-0053-05").click();

    cy.get("input[name=qty]").type("1");
    cy.get("input[name=price]").clear().type("1000");

    cy.get("input[name=unit]").click();
    cy.get("input[name=standardWarranty]").click();

    cy.get("#add-device-form button").contains("Add").click();
    cy.get(".group-lineitem-table-row").should("have.length", 1);

    cy.get("input[name=leadTime]").type("14");

    cy.get("button").contains("Next").click();
    cy.get("button").contains("Next").click();
    cy.get("button").contains("Finalize").click();

    cy.wait("@quote");
    cy.get("#quote-status", { timeout: 10000 }).should("contain", "Uploading PDF");
    cy.wait("@document", { timeout: 20000 });

    cy.get(".MuiTab-textColorPrimary.Mui-selected").should("exist");
    cy.get("input[name=leadTime]").should("have.value", "14");
    cy.get(".MuiDataGrid-root .MuiDataGrid-row").should("have.length", 1);
  });
});
