import {
  Children,
  isValidElement,
  type ComponentType,
  type ReactNode,
} from "react";
import { getClassName } from "../utilities/getClassName";
import type { TagProps } from "../Tag/TagCommon";

export type TagListProps = {
  children: ReactNode;
  hideThreshold?: number;
  className?: string;
  OverflowTag: ComponentType<TagProps>;
};

export const TagListCommon = ({
  children,
  hideThreshold = 2,
  className = "",
  OverflowTag,
}: TagListProps) => {
  const childArray = Children.toArray(children).filter(isValidElement);
  const total = childArray.length;
  const isOverflowing = total > hideThreshold;
  const visibleChildren = isOverflowing
    ? childArray.slice(0, hideThreshold)
    : childArray;
  const hiddenCount = total - hideThreshold;

  return (
    <div
      className={getClassName({
        baseClassName: "af-tag-list",
        className,
      })}
    >
      {visibleChildren}
      {isOverflowing ? <OverflowTag>+{hiddenCount}</OverflowTag> : null}
    </div>
  );
};
