"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hua-labs/ui";
import { PriorityBadge } from "@/components/issue";
import { StatusBadge } from "@/components/issue";

const IssueForm = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.IssueForm })));
const CommentList = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.CommentList })));
const SubtaskManager = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.SubtaskManager })));
const AIFeatures = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.AIFeatures })));
import { Markdown } from "@/components/common";
import { DatePicker } from "@/components/forms";
import { EmptyState, ErrorState, LoadingState } from "@/components/common";
import { useIssue } from "@/hooks/useIssue";
import { useAuthStore } from "@/store/auth-store";
import { Dropdown, DropdownMenu, DropdownItem } from "@hua-labs/ui";
import { Drawer, DrawerHeader, DrawerContent } from "@hua-labs/ui";
import { ConfirmDialog } from "@/components/common";
import { useToast } from "@hua-labs/ui";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Issue, IssueStatus } from "@/types";

// 상태 이름 매핑
const statusNameMap: Record<Issue["status"], string> = {
  TODO: "할 일",
  IN_PROGRESS: "진행 중",
  IN_REVIEW: "검토 중",
  DONE: "완료",
};

export default function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { issue, isLoading, error, addComment, updateComment, deleteComment, updateIssue, deleteIssue, refetch } = useIssue(id);
  const { user } = useAuthStore();
  const { addToast } = useToast();
  const router = useRouter();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  // 상태 옵션
  const statusOptions = [
    { value: "TODO", label: "할 일" },
    { value: "IN_PROGRESS", label: "진행 중" },
    { value: "IN_REVIEW", label: "검토 중" },
    { value: "DONE", label: "완료" },
  ];

  if (isLoading) {
    return (
      <AppLayout title="이슈" activeItem="issues">
        <LoadingState message="이슈를 불러오는 중..." />
      </AppLayout>
    );
  }

  if (error || !issue) {
    return (
      <AppLayout title="이슈를 찾을 수 없습니다" activeItem="issues">
        <ErrorState
          title="이슈를 찾을 수 없습니다"
          message={error?.message || "요청하신 이슈가 존재하지 않거나 삭제되었습니다."}
          onRetry={() => window.location.reload()}
          retryLabel="다시 시도"
        />
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title={issue.title}
      description={`이슈 #${issue.id}`}
      activeItem="issues"
    >
      <div className="flex flex-col gap-6">
        {/* 헤더 액션 */}
        <div className="flex items-center justify-between">
          <Link
            href="/issues"
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-strong)]"
          >
            <Icon name="chevronLeft" size={16} />
            이슈 목록으로
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditFormOpen(true)}>
              수정
            </Button>
            <Dropdown
              trigger={
                <Button>
                  상태 변경
                </Button>
              }
              align="end"
            >
              <DropdownMenu>
                {statusOptions.map((status) => (
                  <DropdownItem
                    key={status.value}
                    onClick={() => {
                      updateIssue({ status: status.value as IssueStatus });
                    }}
                    disabled={issue.status === status.value}
                  >
                    {status.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              variant="destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              삭제
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 설명 */}
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>설명</CardTitle>
              </CardHeader>
              <CardContent>
                {issue.description ? (
                  <Markdown content={issue.description} />
                ) : (
                  <p className="text-[var(--text-muted)]">설명이 없습니다.</p>
                )}
              </CardContent>
            </Card>

            {/* 서브태스크 */}
            <SubtaskManager issueId={issue.id} subtasks={issue.subtasks || []} />

            {/* 댓글 섹션 */}
            <CommentList
              comments={issue.comments || []}
              issueId={issue.id}
              currentUserId={user?.id}
              onCommentAdd={addComment}
              onCommentUpdate={updateComment}
              onCommentDelete={deleteComment}
            />
          </div>

          {/* 사이드바 */}
          <div className="space-y-6">
            {/* 상태 정보 */}
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>상태</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-2">상태</div>
                  <StatusBadge status={statusNameMap[issue.status]} />
                </div>
                <div>
                  <div className="text-sm text-[var(--text-muted)] mb-2">우선순위</div>
                  <PriorityBadge priority={issue.priority} />
                </div>
                {issue.assignee && (
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">담당자</div>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-[var(--brand-primary)] flex items-center justify-center text-white text-sm">
                        {issue.assignee.name[0]}
                      </div>
                      <span className="text-[var(--text-strong)]">{issue.assignee.name}</span>
                    </div>
                  </div>
                )}
                {issue.labels.length > 0 && (
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">라벨</div>
                    <div className="flex flex-wrap gap-2">
                      {issue.labels.map((label) => (
                        <StatusBadge
                          key={label.id}
                          status={label.name}
                          color={label.color}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                )}
                {issue.dueDate && (
                  <div>
                    <div className="text-sm text-[var(--text-muted)] mb-2">마감일</div>
                    <DatePicker
                      selected={new Date(issue.dueDate)}
                      readOnly
                      className="w-full"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI 기능 */}
            <AIFeatures issue={issue} comments={issue.comments || []} />

            {/* 메타 정보 */}
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <div className="text-[var(--text-muted)]">생성일</div>
                  <div className="text-[var(--text-strong)]">
                    {new Date(issue.createdAt).toLocaleString("ko-KR")}
                  </div>
                </div>
                <div>
                  <div className="text-[var(--text-muted)]">수정일</div>
                  <div className="text-[var(--text-strong)]">
                    {new Date(issue.updatedAt).toLocaleString("ko-KR")}
                  </div>
                </div>
                {issue.project && (
                  <div>
                    <div className="text-[var(--text-muted)]">프로젝트</div>
                    <Link
                      href={`/projects/${issue.projectId}`}
                      className="text-[var(--brand-primary)] hover:underline"
                    >
                      {issue.project.name}
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* 이슈 수정 Drawer */}
      <Drawer
        open={isEditFormOpen}
        onOpenChange={setIsEditFormOpen}
        side="right"
        size="lg"
      >
        <DrawerHeader showCloseButton onClose={() => setIsEditFormOpen(false)}>
          <h2 className="text-lg font-semibold text-[var(--text-strong)]">이슈 수정</h2>
        </DrawerHeader>
        <DrawerContent>
          <IssueForm
            issueId={id}
            onSuccess={() => {
              setIsEditFormOpen(false);
              refetch();
            }}
            onCancel={() => setIsEditFormOpen(false)}
          />
        </DrawerContent>
      </Drawer>

      {/* 삭제 확인 다이얼로그 */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="이슈 삭제"
        description={`"${issue.title}" 이슈를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.`}
        confirmLabel="삭제"
        cancelLabel="취소"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={async () => {
          setIsDeleting(true);
          try {
            await deleteIssue();
            addToast({
              title: "성공",
              message: "이슈가 삭제되었습니다",
              type: "success",
            });
            router.push("/issues");
          } catch (err) {
            addToast({
              title: "오류",
              message: err instanceof Error ? err.message : "이슈 삭제에 실패했습니다",
              type: "error",
            });
          } finally {
            setIsDeleting(false);
          }
        }}
      />
    </AppLayout>
  );
}
