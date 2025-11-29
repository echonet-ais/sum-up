import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { User } from "@/types";

/**
 * GET /api/users/me
 * 현재 사용자 프로필 조회
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 프로필 정보 조회
    const { data: profile, error: profileError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError || !profile) {
      console.error("Error fetching user profile:", profileError);
      return NextResponse.json(
        { error: "Profile not found" },
        { status: 404 }
      );
    }

    const mappedUser: User = {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      avatar: profile.avatar ?? undefined,
      role: profile.role,
      createdAt: profile.created_at,
      updatedAt: profile.updated_at,
    };

    return NextResponse.json(mappedUser);
  } catch (error) {
    console.error("Unexpected error fetching user profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch user profile" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/me
 * 현재 사용자 프로필 수정
 */
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, avatar } = body as {
      name?: string;
      avatar?: string;
    };

    const updates: any = {};
    if (name !== undefined) {
      if (typeof name !== "string" || name.trim().length === 0) {
        return NextResponse.json(
          { error: "Name cannot be empty" },
          { status: 400 }
        );
      }
      updates.name = name.trim();
    }
    if (avatar !== undefined) {
      updates.avatar = avatar || null;
    }
    updates.updated_at = new Date().toISOString();

    // 프로필 업데이트
    const { data: updatedProfile, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("id", user.id)
      .select("*")
      .single();

    if (updateError || !updatedProfile) {
      console.error("Error updating user profile:", updateError);
      return NextResponse.json(
        { error: "Failed to update profile" },
        { status: 500 }
      );
    }

    const mappedUser: User = {
      id: updatedProfile.id,
      name: updatedProfile.name,
      email: updatedProfile.email,
      avatar: updatedProfile.avatar ?? undefined,
      role: updatedProfile.role,
      createdAt: updatedProfile.created_at,
      updatedAt: updatedProfile.updated_at,
    };

    return NextResponse.json(mappedUser);
  } catch (error) {
    console.error("Unexpected error updating user profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

