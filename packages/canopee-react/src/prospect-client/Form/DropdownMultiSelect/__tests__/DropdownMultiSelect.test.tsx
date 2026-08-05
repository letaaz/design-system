import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { DropdownMultiSelect as DropdownMultiSelectLF } from "../DropdownMultiSelectLF";
import { DropdownMultiSelect as DropdownMultiSelectApollo } from "../DropdownMultiSelectApollo";

const selectLabel = "Label";
const errorMessage = "Titre du Message";
const helperText = "Information complementaires";

const options = [
  { label: "For fun", value: "fun" },
  { label: "For work", value: "work" },
  { label: "For drink", value: "drink" },
];

describe("DropdownMultiSelect", () => {
  it("renders native multiple select and option mapping", async () => {
    render(<DropdownMultiSelectLF label={selectLabel} options={options} />);

    const selectElement = screen.getByLabelText(/label/i);
    expect(selectElement).toHaveAttribute("multiple");

    await userEvent.selectOptions(selectElement, ["fun", "work"]);

    const selected = screen
      .getAllByRole("option")
      .filter((option) => (option as HTMLOptionElement).selected)
      .map((option) => option.textContent);

    expect(selected).toContain("For fun");
    expect(selected).toContain("For work");
  });

  it("always renders the placeholder null option with text 'Sélectionner'", () => {
    render(<DropdownMultiSelectLF label={selectLabel} options={options} />);

    const placeholderOption = screen.getByRole("option", {
      name: "Sélectionner",
    }) as HTMLOptionElement;

    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption.value).toBe("");
  });

  it("does not block selecting regular options when placeholder exists", async () => {
    render(
      <DropdownMultiSelectLF
        label={selectLabel}
        defaultValue={[""]}
        options={options}
      />,
    );

    const selectElement = screen.getByLabelText(/label/i);
    await userEvent.selectOptions(selectElement, ["drink"]);

    const drinkOption = screen.getByRole("option", {
      name: "For drink",
    }) as HTMLOptionElement;
    expect(drinkOption.selected).toBe(true);
  });

  it("supports message API and containerProps conventions", () => {
    render(
      <DropdownMultiSelectLF
        label={selectLabel}
        options={options}
        message={errorMessage}
        messageType="error"
        helper={helperText}
        containerProps={{ "data-cols-mobile": "12" }}
      />,
    );

    const selectElement = screen.getByLabelText(/label/i);
    expect(selectElement).toHaveClass(
      "af-form__dropdown-multi-select-input--error",
    );
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(helperText)).toBeInTheDocument();

    const container = selectElement.closest("div");
    expect(container).toHaveAttribute("data-cols-mobile", "12");
  });

  it("keeps the same API shape between Apollo and LF themes", () => {
    const { container: apolloContainer } = render(
      <DropdownMultiSelectApollo
        label={selectLabel}
        options={options}
        name="multi-select"
      />,
    );

    const { container: lfContainer } = render(
      <DropdownMultiSelectLF
        label={selectLabel}
        options={options}
        name="multi-select"
      />,
    );

    expect(
      apolloContainer.querySelector("select")?.getAttribute("multiple"),
    ).toBe("");
    expect(lfContainer.querySelector("select")?.getAttribute("multiple")).toBe(
      "",
    );
  });

  it("should not have accessibility violations", async () => {
    const { container } = render(
      <DropdownMultiSelectLF label={selectLabel} options={options} />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
