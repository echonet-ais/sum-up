/**
 * 데이터 내보내기 유틸리티
 */

/**
 * CSV로 내보내기
 */
export function exportToCSV<T extends Record<string, any>>(
  data: T[],
  filename: string = "export.csv",
  headers?: string[]
) {
  if (data.length === 0) return;

  const csvHeaders = headers || Object.keys(data[0]);
  const csvRows = [
    csvHeaders.join(","),
    ...data.map((row) =>
      csvHeaders
        .map((header) => {
          const value = row[header];
          // CSV 이스케이프 처리
          if (value === null || value === undefined) return "";
          const stringValue = String(value);
          if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        })
        .join(",")
    ),
  ];

  const csvContent = csvRows.join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * JSON으로 내보내기
 */
export function exportToJSON<T>(data: T, filename: string = "export.json") {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: "application/json" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * 이슈 목록을 CSV로 내보내기
 */
import type { Issue } from "@/types";

export function exportIssuesToCSV(issues: Issue[], filename: string = "issues.csv") {
  const headers = ["ID", "제목", "상태", "우선순위", "프로젝트", "담당자", "생성일", "수정일"];
  const rows = issues.map((issue) => [
    issue.id,
    issue.title,
    issue.status,
    issue.priority,
    issue.project?.name || "",
    issue.assignee?.name || "",
    new Date(issue.createdAt).toLocaleDateString("ko-KR"),
    new Date(issue.updatedAt).toLocaleDateString("ko-KR"),
  ]);

  exportToCSV(rows.map((row) => Object.fromEntries(headers.map((h, i) => [h, row[i]]))), filename, headers);
}

