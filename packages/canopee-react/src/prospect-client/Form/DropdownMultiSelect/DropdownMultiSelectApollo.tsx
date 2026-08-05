import "@axa-fr/canopee-css/prospect/Form/DropdownMultiSelect/DropdownMultiSelectApollo.css";
import { ItemLabel } from "../ItemLabel/ItemLabelApollo";
import { ItemMessage } from "../ItemMessage/ItemMessageApollo";
import {
  DropdownMultiSelectCommon,
  type DropdownMultiSelectProps,
} from "./DropdownMultiSelectCommon";
import { TagList } from "../../TagList/TagListApollo";
import { Tag } from "../../Tag/TagApollo";

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
