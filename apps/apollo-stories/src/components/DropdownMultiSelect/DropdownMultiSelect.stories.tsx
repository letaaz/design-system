import {
  DropdownMultiSelect,
  itemMessageVariants,
} from "@axa-fr/canopee-react/prospect";
import type { Meta, StoryObj } from "@storybook/react";
import { type ComponentProps, useState } from "react";

const options = [
  { label: "For fun", value: "fun" },
  { label: "For work", value: "work" },
  { label: "For drink", value: "drink" },
  { label: "For travel", value: "travel" },
  { label: "For disabled", value: "disabled", disabled: true },
];

const meta: Meta<typeof DropdownMultiSelect> = {
  component: DropdownMultiSelect,
  title: "Components/Form/Dropdown/DropdownMultiSelect",
  parameters: {
    docs: {
      description: {
        component:
          "Composant natif select multiple. Pour selectionner plusieurs options: maintenir Ctrl (Windows/Linux) ou Cmd (macOS), puis cliquer sur les options.",
      },
    },
  },
  args: {
    description: "Description",
    label: "Label",
    disabled: false,
    required: true,
    buttonLabel: "En savoir plus",
    helper: "Maintenez Ctrl/Cmd pour selectionner plusieurs options.",
    message: "",
    messageType: "error",
  },
  argTypes: {
    onChange: { action: "onChange" },
    messageType: {
      options: Object.values(itemMessageVariants),
      control: { type: "select" },
    },
  },
};

export default meta;

type StoryProps = ComponentProps<typeof DropdownMultiSelect>;
type Story = StoryObj<StoryProps>;

const RenderControlled = (args: StoryProps) => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div style={{ width: 360 }}>
      <DropdownMultiSelect
        {...args}
        value={value}
        options={options}
        onChange={(event) => {
          const selectedValues = Array.from(event.currentTarget.selectedOptions)
            .map((option) => option.value)
            .filter((optionValue) => optionValue !== "");

          setValue(selectedValues);
        }}
      />
    </div>
  );
};

export const DropdownMultiSelectStory: Story = {
  name: "Playground",
  render: RenderControlled,
};

export const WithInitialSelection: Story = {
  args: {
    helper: "Deux options sont deja selectionnees.",
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(["fun", "work"]);

    return (
      <div style={{ width: 360 }}>
        <DropdownMultiSelect
          {...args}
          value={value}
          options={options}
          onChange={(event) => {
            const selectedValues = Array.from(
              event.currentTarget.selectedOptions,
            )
              .map((option) => option.value)
              .filter((optionValue) => optionValue !== "");

            setValue(selectedValues);
          }}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    helper: "Champ desactive",
  },
  render: RenderControlled,
};

export const WithSuccess: Story = {
  args: {
    message: "Selection enregistree",
    messageType: "success",
  },
  render: RenderControlled,
};

export const WithError: Story = {
  args: {
    message: "Selection invalide",
    messageType: "error",
  },
  render: RenderControlled,
};
