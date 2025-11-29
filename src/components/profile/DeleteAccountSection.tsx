"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Button } from "@hua-labs/ui";
import { Icon } from "@hua-labs/ui";
import { ConfirmDialog } from "@/components/common";
import { useAuthStore } from "@/store/auth-store";
import { useToast } from "@hua-labs/ui";
import { useRouter } from "next/navigation";

export function DeleteAccountSection() {
  const { logout } = useAuthStore();
  const { addToast } = useToast();
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "계정 삭제에 실패했습니다.");
      }

      addToast({
        title: "성공",
        message: data.message || "계정이 삭제되었습니다.",
        type: "success",
      });

      // 로그아웃 처리
      await logout();
      
      // 홈 페이지로 리다이렉트
      router.push("/");
      router.refresh();
    } catch (error) {
      addToast({
        title: "오류",
        message: error instanceof Error ? error.message : "계정 삭제에 실패했습니다.",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
        <CardHeader>
          <CardTitle className="text-[var(--color-error)]">위험 구역</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--text-strong)] mb-2">
              계정 삭제
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4">
              계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
              이 작업은 되돌릴 수 없으므로 신중하게 결정해주세요.
            </p>
            <Button
              variant="destructive"
              onClick={() => setIsDialogOpen(true)}
            >
              <Icon name="trash" size={16} className="mr-2" />
              계정 삭제
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="계정 삭제 확인"
        description="정말로 계정을 삭제하시겠습니까? 이 작업은 되돌릴 수 없으며, 모든 데이터가 영구적으로 삭제됩니다."
        confirmLabel="계정 삭제"
        cancelLabel="취소"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={handleDeleteAccount}
      />
    </>
  );
}

