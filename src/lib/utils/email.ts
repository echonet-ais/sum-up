import { createServerClient } from "@/lib/supabase/server";
import { Resend } from "resend";

/**
 * 이메일 발송 유틸리티
 * Supabase Auth의 이메일 기능 및 외부 이메일 서비스 활용
 */

/**
 * 이메일 서비스 타입
 */
type EmailService = "resend" | "sendgrid" | "supabase" | "console";

/**
 * 팀 초대 이메일 발송
 * @param email 초대할 사용자 이메일
 * @param teamName 팀 이름
 * @param inviterName 초대한 사용자 이름
 * @param teamId 팀 ID (초대 링크에 사용)
 */
export async function sendTeamInviteEmail(
  email: string,
  teamName: string,
  inviterName: string,
  teamId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const emailService = (process.env.EMAIL_SERVICE || "console") as EmailService;
    const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/teams/${teamId}`;

    switch (emailService) {
      case "resend":
        return await sendViaResend(email, teamName, inviterName, inviteUrl);
      case "sendgrid":
        return await sendViaSendGrid(email, teamName, inviterName, inviteUrl);
      case "supabase":
        return await sendViaSupabase(email, teamName, inviterName, inviteUrl);
      case "console":
      default:
        // 개발 환경: 콘솔에 로그만 출력
        console.log(`[Email] Team invite to ${email}`, {
          teamName,
          inviterName,
          inviteUrl,
        });
        return { success: true };
    }
  } catch (error) {
    console.error("Error sending team invite email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * Resend를 통한 이메일 발송 (Resend SDK 사용)
 */
async function sendViaResend(
  email: string,
  teamName: string,
  inviterName: string,
  inviteUrl: string
): Promise<{ success: boolean; error?: string }> {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn("RESEND_API_KEY not set, falling back to console logging");
    return { success: true };
  }

  try {
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "onboarding@resend.dev",
      to: email,
      subject: `${teamName} 팀 초대`,
      html: generateTeamInviteEmailHTML(teamName, inviterName, inviteUrl),
      text: generateTeamInviteEmailText(teamName, inviterName, inviteUrl),
    });

    if (error) {
      console.error("Resend email error:", error);
      throw new Error(error.message || "Failed to send email via Resend");
    }

    console.log("Email sent successfully via Resend:", data);
    return { success: true };
  } catch (error) {
    console.error("Resend email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * SendGrid를 통한 이메일 발송
 */
async function sendViaSendGrid(
  email: string,
  teamName: string,
  inviterName: string,
  inviteUrl: string
): Promise<{ success: boolean; error?: string }> {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    console.warn("SENDGRID_API_KEY not set, falling back to console logging");
    return { success: true };
  }

  try {
    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sendgridApiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email }],
            subject: `${teamName} 팀 초대`,
          },
        ],
        from: { email: process.env.EMAIL_FROM || "noreply@example.com" },
        content: [
          {
            type: "text/html",
            value: generateTeamInviteEmailHTML(teamName, inviterName, inviteUrl),
          },
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || "Failed to send email via SendGrid");
    }

    return { success: true };
  } catch (error) {
    console.error("SendGrid email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * Supabase를 통한 이메일 발송
 * 
 * 옵션 1: Supabase Auth의 이메일 기능 활용 (비밀번호 재설정 등)
 * 옵션 2: Supabase SMTP 설정 후 직접 발송
 * 옵션 3: Supabase Edge Function 사용
 * 
 * 현재는 Supabase Auth의 invite 기능을 활용하거나,
 * SMTP가 설정되어 있으면 직접 발송 가능
 */
async function sendViaSupabase(
  email: string,
  teamName: string,
  inviterName: string,
  inviteUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();
    
    // 옵션 1: Supabase Auth의 invite 기능 사용 (사용자가 없을 때)
    // 하지만 이건 회원가입 초대이므로 팀 초대와는 다름
    
    // 옵션 2: Supabase SMTP가 설정되어 있으면 직접 발송
    // Supabase Dashboard → Settings → Auth → SMTP Settings에서 설정 필요
    
    // 현재는 Supabase의 기본 이메일 기능이 커스텀 이메일을 지원하지 않으므로
    // 콘솔 로그로 대체하고, 실제 발송은 Resend/SendGrid 사용 권장
    
    console.log(`[Email] Team invite to ${email} (Supabase mode)`, {
      teamName,
      inviterName,
      inviteUrl,
      note: "Supabase SMTP 설정이 필요합니다. Settings → Auth → SMTP Settings에서 설정하세요.",
    });
    
    // TODO: Supabase SMTP 설정 후 실제 발송 구현
    // 또는 Supabase Edge Function으로 이메일 발송 구현
    
    return { success: true };
  } catch (error) {
    console.error("Supabase email error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

/**
 * 팀 초대 이메일 HTML 생성
 */
function generateTeamInviteEmailHTML(
  teamName: string,
  inviterName: string,
  inviteUrl: string
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">팀 초대</h1>
        </div>
        <div style="background: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <p style="font-size: 16px; margin-bottom: 20px;">
            안녕하세요!
          </p>
          <p style="font-size: 16px; margin-bottom: 20px;">
            <strong>${inviterName}</strong>님이 <strong>${teamName}</strong> 팀에 초대했습니다.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${inviteUrl}" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">
              팀 참여하기
            </a>
          </div>
          <p style="font-size: 14px; color: #6b7280; margin-top: 30px;">
            링크가 작동하지 않으면 아래 URL을 복사하여 브라우저에 붙여넣으세요:<br>
            <a href="${inviteUrl}" style="color: #667eea; word-break: break-all;">${inviteUrl}</a>
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; color: #9ca3af; font-size: 12px;">
          <p>이 이메일은 SumUp 팀 관리 시스템에서 발송되었습니다.</p>
        </div>
      </body>
    </html>
  `;
}

/**
 * 팀 초대 이메일 텍스트 생성
 */
function generateTeamInviteEmailText(
  teamName: string,
  inviterName: string,
  inviteUrl: string
): string {
  return `
안녕하세요!

${inviterName}님이 ${teamName} 팀에 초대했습니다.

팀에 참여하려면 아래 링크를 클릭하세요:
${inviteUrl}

이 이메일은 SumUp 팀 관리 시스템에서 발송되었습니다.
  `.trim();
}

/**
 * 비밀번호 재설정 이메일 발송 (Supabase Auth 사용)
 * @param email 사용자 이메일
 */
export async function sendPasswordResetEmail(
  email: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createServerClient();
    
    const redirectTo = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password`;
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo,
    });
    
    if (error) {
      console.error("Password reset email error:", error);
      // 보안상 이유로 실제 에러를 숨김
      return { success: true }; // 이메일이 존재하지 않아도 성공으로 처리
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}

