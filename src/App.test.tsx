// import React from "react";
// import { unmountComponentAtNode, render } from "react-dom";
// import { act } from "react-dom/test-utils";

// import App from "./App";

// let container: any = null;
// beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
// });

// it("should renders login page for guest", () => {
//     act(() => {
//         render(<App />, container);
//     });
//     expect(container.textContent).toHaveTextContent("Login");
// });

// afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//     container = null;
// });
