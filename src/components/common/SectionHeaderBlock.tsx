"use client";

import * as React from "react";
import { SectionHeader, SectionHeaderProps } from "./SectionHeader";
import { cn } from "@/lib/utils";

export interface SectionHeaderBlockProps extends SectionHeaderProps {
  containerClassName?: string;
  descriptionSize?: "sm" | "xs";
  action?: React.ReactNode;
  actionSlot?: React.ReactNode;
  showDivider?: boolean;
}

export const SectionHeaderBlock = React.forwardRef<HTMLDivElement, SectionHeaderBlockProps>(
  (
    {
      containerClassName,
      className,
      description,
      action,
      descriptionSize = "sm",
      actionSlot,
      showDivider = false,
      ...sectionProps
    },
    ref
  ) => {
    const baseClass = "px-6 pt-6";
    const mergedClassName = containerClassName
      ? `${baseClass} ${containerClassName}`
      : baseClass;
    const dividerClass = showDivider ? "" : "!border-b-0 !pb-0";
    const headerClassName = className
      ? `px-0 py-0 ${dividerClass} ${className}`
      : `px-0 py-0 ${dividerClass}`;

    const descriptionClass =
      descriptionSize === "xs" ? "text-xs" : "text-sm";

    const renderedAction = actionSlot ? (
      <div className="shrink-0">{actionSlot}</div>
    ) : action ? (
      <div className="shrink-0 text-sm font-semibold text-[var(--brand-primary)] hover:text-[var(--brand-primary-dark)] transition-colors">
        {action}
      </div>
    ) : null;

    return (
      <div ref={ref} className={cn(mergedClassName, "px-4 sm:px-6")}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
          <div className="min-w-0 flex-1">
            <SectionHeader
              {...sectionProps}
              description={undefined}
              className={headerClassName}
            />
            {description && (
              <p className={cn("mt-1 text-[var(--text-subtle)]", descriptionClass)}>
                {description}
              </p>
            )}
          </div>
          {renderedAction}
        </div>
      </div>
    );
  }
);

SectionHeaderBlock.displayName = "SectionHeaderBlock";

