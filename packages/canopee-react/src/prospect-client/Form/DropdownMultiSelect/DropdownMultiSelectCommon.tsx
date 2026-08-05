import classNames from "classnames";
import {
  type ComponentProps,
  type ComponentPropsWithRef,
  type ComponentType,
  type ReactNode,
  useId,
  useMemo,
  useState,
} from "react";
import type { GridContainerProps } from "../../utilities/types/GridContainerProps";
import {
  ItemLabelCommon,
  type ItemLabelProps,
} from "../ItemLabel/ItemLabelCommon";
import {
  ItemMessage,
  type ItemMessageProps,
} from "../ItemMessage/ItemMessageCommon";
import type { TagListProps } from "../../TagList/TagListCommon";
import type { TagProps } from "../../Tag/TagCommon";

export type DropdownMultiSelectOption = {
  value: string;
  label: ReactNode;
  checked?: boolean;
};

export type DropdownMultiSelectProps = Omit<
  ComponentPropsWithRef<"select">,
  "multiple"
> & {
  id?: string;
  classModifier?: string;
  label?: ItemLabelProps["children"];
  helper?: string;
  description?: string;
  containerProps?: GridContainerProps;
  options?: DropdownMultiSelectOption[];
} & Pick<
    ItemLabelProps,
    | "buttonLabel"
    | "moreButtonLabel"
    | "onButtonClick"
    | "onMoreButtonClick"
    | "sideButtonLabel"
    | "onSideButtonClick"
  > &
  Pick<ItemMessageProps, "message" | "messageType">;

type DropdownMultiSelectCommonProps = DropdownMultiSelectProps & {
  TagListComponent: ComponentType<TagListProps>;
  TagComponent: ComponentType<TagProps>;
  ItemLabelComponent: ComponentType<
    Omit<ComponentProps<typeof ItemLabelCommon>, "ButtonComponent">
  >;
  ItemMessageComponent: ComponentType<ComponentProps<typeof ItemMessage>>;
};

const DropdownMultiSelectCommon = ({
  id,
  required,
  value,
  label,
  helper,
  message,
  messageType,
  description,
  buttonLabel,
  moreButtonLabel,
  onButtonClick,
  onMoreButtonClick,
  sideButtonLabel,
  onSideButtonClick,
  ItemLabelComponent,
  ItemMessageComponent,
  TagListComponent,
  TagComponent,
  containerProps,
  options,
  children,
  className,
  onChange,
  ...otherProps
}: DropdownMultiSelectCommonProps) => {
  const [internalValues, setInternalValues] = useState<string[]>(
    () =>
      (Array.isArray(value) ? value : [value]) ??
      options?.filter((item) => item.checked).map((item) => item.value) ??
      [],
  );
  const effectiveOptions = useMemo(
    () =>
      options?.map((item) => ({
        ...item,
        checked: internalValues.includes(item.value),
      })) ?? [],
    [options, internalValues],
  );
  const selectedOptions = useMemo(
    () => effectiveOptions.filter((item) => item.checked),
    [effectiveOptions],
  );
  const summary = useMemo(() => {
    if (selectedOptions.length === 0) {
      return "Sélectionner";
    }

    const plural = selectedOptions.length > 1 ? "s" : "";
    return `${selectedOptions.length} élément${plural} sélectionné${plural}`;
  }, [selectedOptions.length]);

  const idMessage = useId();
  const idHelp = useId();
  let inputId = useId();
  inputId = id || inputId;

  const hasError = Boolean(message) && messageType === "error";
  const hasWarning = !hasError && Boolean(message) && messageType === "warning";

  const inputClassName = classNames(
    "af-form__dropdown-multi-select-input",
    hasError && "af-form__dropdown-multi-select-input--error",
    hasWarning && "af-form__dropdown-multi-select-input--warning",
    className,
  );

  const ariaDescribedby = [
    otherProps["aria-describedby"],
    helper ? idHelp : undefined,
    message ? idMessage : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="af-form__dropdown-multi-select-container"
      {...containerProps}
    >
      <ItemLabelComponent
        description={description}
        moreButtonLabel={moreButtonLabel ?? buttonLabel}
        onMoreButtonClick={onMoreButtonClick ?? onButtonClick}
        sideButtonLabel={sideButtonLabel}
        onSideButtonClick={onSideButtonClick}
        required={required}
        htmlFor={inputId}
      >
        {label}
      </ItemLabelComponent>

      <select
        {...otherProps}
        id={inputId}
        multiple
        className={inputClassName}
        aria-describedby={ariaDescribedby || undefined}
        onChange={(event) => {
          const selectedValues = Array.from(event.currentTarget.selectedOptions)
            .map((option) => option.value)
            .filter((optionValue) => optionValue !== "");
          setInternalValues(selectedValues);

          onChange?.(event);
        }}
      >
        <option
          value=""
          disabled
          className={`af-form__dropdown-multi-select-option af-form__dropdown-multi-select-option--summary${selectedOptions.length > 0 ? " af-form__dropdown-multi-select-option--summary-selected" : ""}`}
        >
          {summary}
        </option>

        {Array.isArray(options)
          ? options.map((option) => (
              <option
                key={`${option.value}-${String(option.label)}`}
                value={option.value}
                className="af-form__dropdown-multi-select-option"
              >
                {option.label}
              </option>
            ))
          : children}
      </select>

      <TagListComponent
        className="dropdown-multi-select__tags"
        OverflowTag={TagComponent}
      >
        {effectiveOptions
          .filter((item) => item.checked)
          .map((item) => (
            <TagComponent key={item.value}>{item.label}</TagComponent>
          ))}
      </TagListComponent>

      {helper ? (
        <span id={idHelp} className="af-form__input-helper">
          {helper}
        </span>
      ) : null}

      <ItemMessageComponent
        id={idMessage}
        message={message}
        messageType={messageType}
      />
    </div>
  );
};

DropdownMultiSelectCommon.displayName = "DropdownMultiSelect";

export { DropdownMultiSelectCommon };
