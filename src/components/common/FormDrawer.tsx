"use client";

import * as React from "react";
import { Drawer, DrawerHeader, DrawerContent } from "@hua-labs/ui";

export interface FormDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  side?: "left" | "right";
  size?: "sm" | "md" | "lg";
}

export function FormDrawer({
  open,
  onOpenChange,
  title,
  children,
  side = "right",
  size = "lg",
}: FormDrawerProps) {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} side={side} size={size}>
      <DrawerHeader showCloseButton onClose={() => onOpenChange(false)}>
        <h2 className="text-lg font-semibold text-[var(--text-strong)]">{title}</h2>
      </DrawerHeader>
      <DrawerContent>{children}</DrawerContent>
    </Drawer>
  );
}

