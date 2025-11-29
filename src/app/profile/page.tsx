"use client";

import { AppLayout } from "@/components/layout";
import { Card, CardHeader, CardTitle, CardContent } from "@hua-labs/ui";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@hua-labs/ui";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PasswordChangeForm } from "@/components/profile/PasswordChangeForm";
import { useAuthStore } from "@/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!user) {
    return (
      <AppLayout title="프로필" activeItem="profile">
        <div className="flex items-center justify-center py-12">
          <p className="text-[var(--text-muted)]">로그인이 필요합니다</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      title="프로필"
      description="프로필 정보를 관리하세요"
      activeItem="profile"
    >
      <div className="flex flex-col gap-6 max-w-4xl">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">프로필 정보</TabsTrigger>
            <TabsTrigger value="password">비밀번호 변경</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>프로필 정보</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfileForm />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="password" className="mt-6">
            <Card className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface)] shadow-sm">
              <CardHeader>
                <CardTitle>비밀번호 변경</CardTitle>
              </CardHeader>
              <CardContent>
                <PasswordChangeForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

