import { render, screen, fireEvent } from "@testing-library/react";
import DodWarning from "./DodWarning";

const dodWarningTitle: string = "USG Warning and Consent Banner"

beforeEach(() => {
    sessionStorage.clear();
    document.body.classList.remove("no-interaction");
});

test("renders the modal when sessionStorage does not have lastVisit set to today", () => {
    render(<DodWarning />);
    expect(screen.getByText(dodWarningTitle));
    expect(document.body.classList.contains("no-interaction")).toBe(true);
});

test("does not render the modal if sessionStorage has today's date", () => {
    sessionStorage.setItem("lastVisit", new Date().toDateString());
    render(<DodWarning />);
    expect(screen.queryByText(dodWarningTitle)).toBeNull();
    expect(document.body.classList.contains("no-interaction")).toBe(false);
});

test("clicking OK button closes the modal and updates sessionStorage", () => {
    render(<DodWarning />);
    const button = screen.getByText("OK");
    expect(screen.getByText(dodWarningTitle));
    expect(document.body.classList.contains("no-interaction")).toBe(true);

    fireEvent.click(button);
    
    expect(screen.queryByText(dodWarningTitle)).toBeNull();
    expect(sessionStorage.getItem("lastVisit")).toBe(new Date().toDateString());
    expect(document.body.classList.contains("no-interaction")).toBe(false);
});