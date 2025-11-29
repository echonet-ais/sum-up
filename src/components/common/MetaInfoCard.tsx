"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";

export interface MetaInfoItem {
  label: string;
  value: React.ReactNode;
}

export interface MetaInfoCardProps {
  title?: string;
  items: MetaInfoItem[];
}

export function MetaInfoCard({ title = "정보", items }: MetaInfoCardProps) {
  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {items.map((item, index) => (
          <div key={index}>
            <div className="text-[var(--text-muted)]">{item.label}</div>
            <div className="text-[var(--text-strong)]">{item.value}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

