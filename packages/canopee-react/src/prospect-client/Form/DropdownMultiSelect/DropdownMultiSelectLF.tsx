import "@axa-fr/canopee-css/client/Form/DropdownMultiSelect/DropdownMultiSelectLF.css";
import { TagList } from "../../TagList/TagListLF";
import { ItemLabel } from "../ItemLabel/ItemLabelLF";
import { ItemMessage } from "../ItemMessage/ItemMessageLF";
import {
  DropdownMultiSelectCommon,
  type DropdownMultiSelectProps,
} from "./DropdownMultiSelectCommon";
import { Tag } from "../../Tag/TagLF";

export type {
  DropdownMultiSelectOption,
  DropdownMultiSelectProps,
} from "./DropdownMultiSelectCommon";

export const DropdownMultiSelect = (props: DropdownMultiSelectProps) => (
  <DropdownMultiSelectCommon
    {...props}
    ItemLabelComponent={ItemLabel}
    ItemMessageComponent={ItemMessage}
    TagListComponent={TagList}
    TagComponent={Tag}
  />
);

DropdownMultiSelect.displayName = "DropdownMultiSelect";
