"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Badge } from "@hua-labs/ui";
import { LoadingState, ErrorState, ConfirmDialog } from "@/components/common";
import { useToast } from "@hua-labs/ui";
import type { CustomStatus, WipLimits } from "@/types";
import { apiClient } from "@/lib/api/client";

export interface ProjectSettingsProps {
  projectId: string;
}

const DEFAULT_STATUS_IDS = ["TODO", "IN_PROGRESS", "IN_REVIEW", "DONE"];
const DEFAULT_STATUS_NAMES: Record<string, string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

export function ProjectSettings({ projectId }: ProjectSettingsProps) {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [customStatuses, setCustomStatuses] = useState<CustomStatus[]>([]);
  const [wipLimits, setWipLimits] = useState<WipLimits>({});
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [deleteStatusId, setDeleteStatusId] = useState<string | null>(null);

  // 커스텀 상태 및 WIP Limit 조회
  useEffect(() => {
    async function fetchSettings() {
      try {
        setIsLoading(true);
        setError(null);

        const [statusesRes, limitsRes] = await Promise.all([
          fetch(`/api/projects/${projectId}/custom-statuses`),
          fetch(`/api/projects/${projectId}/wip-limits`),
        ]);

        if (!statusesRes.ok) {
          throw new Error("커스텀 상태를 불러오는데 실패했습니다.");
        }

        if (!limitsRes.ok) {
          throw new Error("WIP Limit을 불러오는데 실패했습니다.");
        }

        const statusesData = await statusesRes.json();
        const limitsData = await limitsRes.json();

        setCustomStatuses(statusesData.data || []);
        setWipLimits(limitsData.data || {});
      } catch (err) {
        setError(err instanceof Error ? err.message : "설정을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchSettings();
  }, [projectId]);

  // 커스텀 상태 생성
  const handleCreateCustomStatus = async () => {
    try {
      if (customStatuses.length >= 5) {
        addToast({
          title: "알림",
          message: "커스텀 상태는 최대 5개까지 생성할 수 있습니다.",
          type: "info",
        });
        return;
      }

      const newStatus = {
        name: "새 상태",
        color: "#94a3b8",
        position: customStatuses.length,
      };

      const response = await apiClient.post<CustomStatus>(
        `/api/projects/${projectId}/custom-statuses`,
        newStatus
      );

      setCustomStatuses([...customStatuses, response]);
      addToast({
        title: "성공",
        message: "커스텀 상태가 생성되었습니다.",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "커스텀 상태 생성에 실패했습니다.",
        type: "error",
      });
    }
  };

  // 커스텀 상태 수정
  const handleUpdateCustomStatus = async (statusId: string, updates: Partial<CustomStatus>) => {
    try {
      const response = await apiClient.put<CustomStatus>(
        `/api/projects/${projectId}/custom-statuses/${statusId}`,
        updates
      );

      setCustomStatuses(
        customStatuses.map((status) => (status.id === statusId ? response : status))
      );
      setEditingStatusId(null);
      addToast({
        title: "성공",
        message: "커스텀 상태가 수정되었습니다.",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "커스텀 상태 수정에 실패했습니다.",
        type: "error",
      });
    }
  };

  // 커스텀 상태 삭제
  const handleDeleteCustomStatus = async () => {
    if (!deleteStatusId) return;

    try {
      await apiClient.delete(`/api/projects/${projectId}/custom-statuses/${deleteStatusId}`);
      setCustomStatuses(customStatuses.filter((status) => status.id !== deleteStatusId));
      setDeleteStatusId(null);
      addToast({
        title: "성공",
        message: "커스텀 상태가 삭제되었습니다. 해당 상태의 이슈는 TODO로 이동되었습니다.",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "커스텀 상태 삭제에 실패했습니다.",
        type: "error",
      });
    }
  };

  // WIP Limit 저장
  const handleSaveWipLimits = async () => {
    try {
      setIsSaving(true);
      await apiClient.put(`/api/projects/${projectId}/wip-limits`, {
        limits: wipLimits,
      });

      addToast({
        title: "성공",
        message: "WIP Limit이 저장되었습니다.",
        type: "success",
      });
    } catch (err) {
      addToast({
        title: "오류",
        message: err instanceof Error ? err.message : "WIP Limit 저장에 실패했습니다.",
        type: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // WIP Limit 업데이트 (로컬 상태만)
  const handleUpdateWipLimit = (statusId: string, limit: number | null) => {
    if (limit !== null && (limit < 1 || limit > 50)) {
      addToast({
        title: "알림",
        message: "WIP Limit은 1-50 사이의 값이어야 합니다.",
        type: "info",
      });
      return;
    }

    const newLimits = { ...wipLimits };
    if (limit === null || limit === 0) {
      delete newLimits[statusId];
    } else {
      newLimits[statusId] = limit;
    }
    setWipLimits(newLimits);
  };

  if (isLoading) {
    return <LoadingState message="설정을 불러오는 중..." />;
  }

  if (error) {
    return <ErrorState title="설정을 불러올 수 없습니다" message={error} />;
  }

  // 모든 상태 목록 (기본 상태 + 커스텀 상태)
  const allStatuses: Array<{ id: string; name: string; color?: string; isDefault: boolean }> = [
    ...DEFAULT_STATUS_IDS.map((id) => ({
      id,
      name: DEFAULT_STATUS_NAMES[id],
      isDefault: true,
    })),
    ...customStatuses.map((status) => ({
      id: status.id,
      name: status.name,
      color: status.color,
      isDefault: false,
    })),
  ];

  return (
    <div className="space-y-6">
      {/* 커스텀 컬럼 설정 (FR-053) */}
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>커스텀 컬럼 (상태)</CardTitle>
            <Badge variant="secondary">
              {customStatuses.length}/5
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-[var(--text-muted)]">
            프로젝트별로 커스텀 상태를 추가할 수 있습니다. 최대 5개까지 생성 가능합니다.
            기본 상태(TODO, 진행 중, 검토 중, 완료)는 수정하거나 삭제할 수 없습니다.
          </div>

          {/* 기본 상태 표시 */}
          <div>
            <div className="text-sm font-medium text-[var(--text-strong)] mb-2">기본 상태</div>
            <div className="space-y-2">
              {DEFAULT_STATUS_IDS.map((statusId) => (
                <div
                  key={statusId}
                  className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]"
                >
                  <div className="flex-1">
                    <span className="text-sm font-medium text-[var(--text-strong)]">
                      {DEFAULT_STATUS_NAMES[statusId]}
                    </span>
                  </div>
                  <Badge variant="outline">기본</Badge>
                </div>
              ))}
            </div>
          </div>

          {/* 커스텀 상태 목록 */}
          {customStatuses.length > 0 && (
            <div>
              <div className="text-sm font-medium text-[var(--text-strong)] mb-2">커스텀 상태</div>
              <div className="space-y-2">
                {customStatuses.map((status) => (
                  <div
                    key={status.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]"
                  >
                    {editingStatusId === status.id ? (
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <Input
                          value={status.name}
                          onChange={(e) => {
                            const updated = { ...status, name: e.target.value };
                            setCustomStatuses(
                              customStatuses.map((s) => (s.id === status.id ? updated : s))
                            );
                          }}
                          placeholder="상태 이름 (1-30자)"
                          maxLength={30}
                          className="w-full"
                        />
                        <Input
                          type="color"
                          value={status.color || "#94a3b8"}
                          onChange={(e) => {
                            const updated = { ...status, color: e.target.value };
                            setCustomStatuses(
                              customStatuses.map((s) => (s.id === status.id ? updated : s))
                            );
                          }}
                          className="w-full h-10"
                        />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => {
                              handleUpdateCustomStatus(status.id, {
                                name: status.name,
                                color: status.color,
                              });
                            }}
                          >
                            저장
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingStatusId(null)}
                          >
                            취소
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex-1 flex items-center gap-3">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: status.color || "#94a3b8" }}
                          />
                          <span className="text-sm font-medium text-[var(--text-strong)]">
                            {status.name}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingStatusId(status.id)}
                          >
                            <Icon name="edit" size={14} className="mr-1" />
                            수정
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setDeleteStatusId(status.id)}
                            className="text-[var(--color-error)]"
                          >
                            <Icon name="trash" size={14} className="mr-1" />
                            삭제
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {customStatuses.length < 5 && (
            <Button
              variant="outline"
              onClick={handleCreateCustomStatus}
              className="w-full"
            >
              <Icon name="plus" size={16} className="mr-2" />
              커스텀 상태 추가
            </Button>
          )}
        </CardContent>
      </Card>

      {/* WIP Limit 설정 (FR-054) */}
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>WIP Limit (작업 진행 제한)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-[var(--text-muted)]">
            각 상태별로 동시에 진행할 수 있는 최대 이슈 수를 설정할 수 있습니다.
            제한을 두지 않으려면 비워두세요. (1-50 사이의 값)
          </div>

          <div className="space-y-3">
            {allStatuses.map((status) => (
              <div
                key={status.id}
                className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-muted)]"
              >
                <div className="flex items-center gap-3">
                  {status.color && (
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: status.color }}
                    />
                  )}
                  <span className="text-sm font-medium text-[var(--text-strong)]">
                    {status.name}
                  </span>
                  {status.isDefault && (
                    <Badge variant="outline" className="text-xs">기본</Badge>
                  )}
                </div>
                <Input
                  type="number"
                  value={wipLimits[status.id] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    handleUpdateWipLimit(
                      status.id,
                      value === "" ? null : parseInt(value, 10) || 0
                    );
                  }}
                  placeholder="제한 없음"
                  min="1"
                  max="50"
                  className="w-32"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSaveWipLimits} disabled={isSaving}>
              {isSaving ? (
                <>
                  <Icon name="loader" size={16} className="mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Icon name="save" size={16} className="mr-2" />
                  WIP Limit 저장
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={deleteStatusId !== null}
        onOpenChange={(open) => !open && setDeleteStatusId(null)}
        title="커스텀 상태 삭제"
        description="이 커스텀 상태를 삭제하시겠습니까? 해당 상태의 모든 이슈는 자동으로 '할 일' 상태로 이동됩니다."
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="destructive"
        onConfirm={handleDeleteCustomStatus}
      />
    </div>
  );
}
