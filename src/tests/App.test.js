import { render, screen } from "@testing-library/react";
import Login from "../components/Shared/Login";

test("Email form should be in the document", () => {
    const component = render( < Login / > );
    const inputNode = component.getByText("Email:");
    expect(inputNode).toBeInTheDocument();
});

test("Email field should have label", () => {
    const component = render( < Login / > );
    const emailInputNode = component.getByLabelText("Email:");
    expect(emailInputNode.getAttribute("name")).toBe("email");
});