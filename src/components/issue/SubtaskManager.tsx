"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Input } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Checkbox } from "@hua-labs/ui";
import { useIssue } from "@/hooks/useIssue";
import { useToast } from "@hua-labs/ui";
import type { Subtask } from "@/types";

export interface SubtaskManagerProps {
  issueId: string;
  subtasks: Subtask[];
}

export function SubtaskManager({ issueId, subtasks: initialSubtasks }: SubtaskManagerProps) {
  const { addToast } = useToast();
  const { issue, updateIssue } = useIssue(issueId);
  const [subtasks, setSubtasks] = React.useState<Subtask[]>(initialSubtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");

  React.useEffect(() => {
    if (issue?.subtasks) {
      setSubtasks(issue.subtasks);
    }
  }, [issue?.subtasks]);

  const handleAddSubtask = async () => {
    if (!newSubtaskTitle.trim()) return;

    const newSubtask: Subtask = {
      id: `subtask-${Date.now()}`,
      title: newSubtaskTitle.trim(),
      completed: false,
      issueId,
      order: subtasks.length,
    };

    const updatedSubtasks = [...subtasks, newSubtask];

    try {
      await updateIssue({ subtasks: updatedSubtasks });
      setSubtasks(updatedSubtasks);
      setNewSubtaskTitle("");
      addToast({
        title: "서브태스크 추가",
        message: "서브태스크가 추가되었습니다.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "서브태스크 추가 실패",
        message: error instanceof Error ? error.message : "오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const handleToggleSubtask = async (subtaskId: string) => {
    const updatedSubtasks = subtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    try {
      await updateIssue({ subtasks: updatedSubtasks });
      setSubtasks(updatedSubtasks);
    } catch (error) {
      addToast({
        title: "서브태스크 업데이트 실패",
        message: error instanceof Error ? error.message : "오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const handleStartEdit = (subtask: Subtask) => {
    setEditingId(subtask.id);
    setEditingTitle(subtask.title);
  };

  const handleSaveEdit = async (subtaskId: string) => {
    if (!editingTitle.trim()) {
      setEditingId(null);
      return;
    }

    const updatedSubtasks = subtasks.map((st) =>
      st.id === subtaskId ? { ...st, title: editingTitle.trim() } : st
    );

    try {
      await updateIssue({ subtasks: updatedSubtasks });
      setSubtasks(updatedSubtasks);
      setEditingId(null);
      setEditingTitle("");
      addToast({
        title: "서브태스크 수정 완료",
        message: "서브태스크가 수정되었습니다.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "서브태스크 수정 실패",
        message: error instanceof Error ? error.message : "오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const handleDeleteSubtask = async (subtaskId: string) => {
    const updatedSubtasks = subtasks.filter((st) => st.id !== subtaskId);

    try {
      await updateIssue({ subtasks: updatedSubtasks });
      setSubtasks(updatedSubtasks);
      addToast({
        title: "서브태스크 삭제 완료",
        message: "서브태스크가 삭제되었습니다.",
        type: "success",
      });
    } catch (error) {
      addToast({
        title: "서브태스크 삭제 실패",
        message: error instanceof Error ? error.message : "오류가 발생했습니다.",
        type: "error",
      });
    }
  };

  const completedSubtasks = subtasks.filter((st) => st.completed).length;
  const totalSubtasks = subtasks.length;
  const progressPercentage =
    totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  if (subtasks.length === 0 && !newSubtaskTitle) {
    return (
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle>서브태스크</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Input
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
              placeholder="서브태스크 추가..."
              className="flex-1"
            />
            <Button onClick={handleAddSubtask} size="sm">
              <Icon name="add" size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>서브태스크</CardTitle>
          <span className="text-sm text-[var(--text-muted)]">
            {completedSubtasks} / {totalSubtasks} 완료
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="h-2 bg-[var(--surface-muted)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--brand-primary)] transition-all"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {subtasks
            .sort((a, b) => a.order - b.order)
            .map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-3 p-3 rounded-md border border-[var(--border-subtle)] hover:bg-[var(--surface-muted)] transition-colors"
              >
                <Checkbox
                  checked={subtask.completed}
                  onChange={() => handleToggleSubtask(subtask.id)}
                />
                {editingId === subtask.id ? (
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveEdit(subtask.id);
                        } else if (e.key === "Escape") {
                          setEditingId(null);
                          setEditingTitle("");
                        }
                      }}
                      className="flex-1"
                      autoFocus
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleSaveEdit(subtask.id)}
                    >
                      저장
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(null);
                        setEditingTitle("");
                      }}
                    >
                      취소
                    </Button>
                  </div>
                ) : (
                  <>
                    <span
                      className={`flex-1 ${
                        subtask.completed
                          ? "line-through text-[var(--text-muted)]"
                          : "text-[var(--text-strong)]"
                      }`}
                    >
                      {subtask.title}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStartEdit(subtask)}
                      >
                        <Icon name="edit" size={14} />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                      >
                        <Icon name="trash" size={14} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <Input
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
            placeholder="서브태스크 추가..."
            className="flex-1"
          />
          <Button onClick={handleAddSubtask} size="sm">
            <Icon name="add" size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

