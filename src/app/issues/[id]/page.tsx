"use client";

import { use, useState } from "react";
import dynamic from "next/dynamic";
import { DetailPageLayout } from "@/components/layout";
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
const IssueAttachments = dynamic(() => import("@/components/issue").then((mod) => ({ default: mod.IssueAttachments })));
import { Markdown } from "@/components/common";
import { DatePicker } from "@/components/forms";
import { EmptyState, ErrorState, LoadingState } from "@/components/common";
import { useIssue } from "@/hooks/useIssue";
import { useAuthStore } from "@/store/auth-store";
import { Dropdown, DropdownMenu, DropdownItem } from "@hua-labs/ui";
import { FormDrawer, MetaInfoCard, ConfirmDialog, SectionErrorBoundary } from "@/components/common";
import { useDeleteDialog } from "@/hooks";
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
  const router = useRouter();
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  
  // 상태 옵션
  const statusOptions = [
    { value: "TODO", label: "할 일" },
    { value: "IN_PROGRESS", label: "진행 중" },
    { value: "IN_REVIEW", label: "검토 중" },
    { value: "DONE", label: "완료" },
  ];

  // 삭제 다이얼로그 훅
  const {
    isOpen: isDeleteDialogOpen,
    setIsOpen: setIsDeleteDialogOpen,
    isDeleting,
    handleConfirm: handleDeleteConfirm,
  } = useDeleteDialog(
    () => deleteIssue(),
    {
      title: "이슈 삭제",
      description: issue ? `"${issue.title}" 이슈를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.` : "",
      redirectTo: "/issues",
    }
  );

  // 액션 버튼들
  const actions = (
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
              disabled={issue?.status === status.value}
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
  );

  return (
    <DetailPageLayout
      title={issue?.title || "이슈"}
      description={issue ? `이슈 #${issue.id}` : undefined}
      activeItem="issues"
      isLoading={isLoading}
      error={error || (!issue && !isLoading ? new Error("이슈를 찾을 수 없습니다") : null)}
      backHref="/issues"
      backLabel="이슈 목록으로"
      actions={actions}
    >
      {issue && (
        <>
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
            <SectionErrorBoundary sectionName="서브태스크">
              <SubtaskManager issueId={issue.id} subtasks={issue.subtasks || []} />
            </SectionErrorBoundary>

            {/* 첨부파일 */}
            {issue.attachments && issue.attachments.length > 0 && (
              <SectionErrorBoundary sectionName="첨부파일">
                <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
                  <CardHeader>
                    <CardTitle>첨부파일</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <IssueAttachments
                      attachments={issue.attachments}
                      canDelete={user?.id === issue.assigneeId || user?.role === "ADMIN"}
                    />
                  </CardContent>
                </Card>
              </SectionErrorBoundary>
            )}

            {/* 댓글 섹션 */}
            <SectionErrorBoundary sectionName="댓글">
              <CommentList
                comments={issue.comments || []}
                issueId={issue.id}
                currentUserId={user?.id}
                onCommentAdd={addComment}
                onCommentUpdate={updateComment}
                onCommentDelete={deleteComment}
              />
            </SectionErrorBoundary>
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
            <SectionErrorBoundary sectionName="AI 기능">
              <AIFeatures issue={issue} comments={issue.comments || []} />
            </SectionErrorBoundary>

            {/* 메타 정보 */}
            <MetaInfoCard
              items={[
                {
                  label: "생성일",
                  value: new Date(issue.createdAt).toLocaleString("ko-KR"),
                },
                {
                  label: "수정일",
                  value: new Date(issue.updatedAt).toLocaleString("ko-KR"),
                },
                ...(issue.project
                  ? [
                      {
                        label: "프로젝트",
                        value: (
                          <Link
                            href={`/projects/${issue.projectId}`}
                            className="text-[var(--brand-primary)] hover:underline"
                          >
                            {issue.project.name}
                          </Link>
                        ),
                      },
                    ]
                  : []),
              ]}
            />
          </div>
        </div>

        {/* 이슈 수정 Drawer */}
        <FormDrawer
          open={isEditFormOpen}
          onOpenChange={setIsEditFormOpen}
          title="이슈 수정"
        >
          <IssueForm
            issueId={id}
            onSuccess={() => {
              setIsEditFormOpen(false);
              refetch();
            }}
            onCancel={() => setIsEditFormOpen(false)}
          />
        </FormDrawer>

        {/* 삭제 확인 다이얼로그 */}
        <ConfirmDialog
          open={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          title="이슈 삭제"
          description={issue ? `"${issue.title}" 이슈를 정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.` : ""}
          confirmLabel="삭제"
          cancelLabel="취소"
          variant="destructive"
          isLoading={isDeleting}
          onConfirm={handleDeleteConfirm}
        />
        </>
      )}
    </DetailPageLayout>
  );
}
