# Supabase Realtime 활성화 가이드

> **작성일**: 2025-11-30  
> **최종 업데이트**: 2025-11-30  
> **목적**: Supabase Realtime 기능 활성화 방법 안내  
> **확인 사항**: 2025년 11월 기준 최신 정보 반영, 무료 플랜 사용 가능 확인

---

## 📋 개요

Supabase Realtime을 활성화하면 데이터베이스 변경사항을 실시간으로 구독할 수 있습니다. 이 프로젝트에서는 다음 기능에 Realtime을 사용합니다:

- **알림 (notifications)**: 실시간 알림 업데이트
- **댓글 (comments)**: 실시간 댓글 업데이트
- **이슈 (issues)**: 실시간 이슈 업데이트 (칸반 보드, 이슈 목록)

---

## 🔧 Supabase Dashboard에서 활성화하기

### 1단계: Supabase Dashboard 접속

1. [Supabase Dashboard](https://app.supabase.com)에 로그인
2. 프로젝트 선택

### 2단계: Database > Replication 메뉴로 이동

1. 좌측 사이드바에서 **Database** 클릭
2. **Replication** 메뉴 클릭

### 3단계: 테이블별 Realtime 활성화

다음 테이블들에 대해 Realtime을 활성화해야 합니다:

#### ✅ notifications 테이블
1. `notifications` 테이블 찾기
2. **Enable Realtime** 토글을 **ON**으로 설정

#### ✅ comments 테이블
1. `comments` 테이블 찾기
2. **Enable Realtime** 토글을 **ON**으로 설정

#### ✅ issues 테이블
1. `issues` 테이블 찾기
2. **Enable Realtime** 토글을 **ON**으로 설정

---

## 📝 데이터베이스 마이그레이션 확인

프로젝트에는 이미 Realtime을 위한 마이그레이션 파일이 있습니다:

**파일**: `supabase/migrations/2025-11-29_enable_realtime.sql`

이 마이그레이션은 다음을 수행합니다:
- `REPLICA IDENTITY FULL` 설정 (notifications, comments, issues 테이블)
- Realtime이 변경 사항을 추적할 수 있도록 설정

**중요**: 마이그레이션 파일만으로는 Realtime이 활성화되지 않습니다. **반드시 Supabase Dashboard에서도 활성화해야 합니다.**

---

## 🔍 코드에서 Realtime 사용 확인

프로젝트에서 Realtime을 사용하는 위치:

### 1. 알림 (Notifications)
- **파일**: `src/hooks/useRealtimeNotifications.ts`
- **사용 위치**: `src/hooks/useNotifications.ts`
- **기능**: 알림 테이블 변경 시 실시간 업데이트

### 2. 댓글 (Comments)
- **파일**: `src/hooks/useRealtimeComments.ts`
- **사용 위치**: `src/hooks/useIssue.ts`
- **기능**: 댓글 추가/수정/삭제 시 실시간 업데이트

### 3. 이슈 (Issues)
- **파일**: `src/hooks/useRealtimeIssues.ts`
- **사용 위치**: 
  - `src/hooks/useIssues.ts` (이슈 목록)
  - `src/app/kanban/page.tsx` (칸반 보드)
- **기능**: 이슈 상태 변경, 업데이트 시 실시간 반영

---

## ✅ 활성화 확인 방법

### 방법 1: 브라우저 개발자 도구

1. 애플리케이션 실행 (`npm run dev`)
2. 개발자 도구 열기 (F12)
3. **Network** 탭에서 WebSocket 연결 확인
   - `wss://[project-ref].supabase.co/realtime/v1/websocket` 연결이 보이면 정상

### 방법 2: 기능 테스트

1. **알림 테스트**:
   - 다른 사용자로 로그인하여 이슈 생성
   - 현재 사용자 화면에서 알림이 실시간으로 나타나는지 확인

2. **댓글 테스트**:
   - 이슈 상세 페이지에서 댓글 추가
   - 다른 브라우저/탭에서 댓글이 실시간으로 나타나는지 확인

3. **칸반 보드 테스트**:
   - 칸반 보드에서 이슈를 다른 컬럼으로 드래그
   - 다른 브라우저/탭에서 변경사항이 실시간으로 반영되는지 확인

---

## ⚠️ 주의사항

1. **RLS (Row Level Security) 정책 확인**
   - Realtime 구독 시 RLS 정책이 올바르게 설정되어 있어야 합니다
   - 권한이 없는 데이터는 자동으로 필터링됩니다

2. **성능 고려사항**
   - Realtime은 많은 연결을 유지할 수 있지만, 과도한 구독은 성능에 영향을 줄 수 있습니다
   - 필요한 테이블에만 Realtime을 활성화하세요

3. **비용 고려사항 (2025년 11월 기준)**
   - ✅ **무료 플랜에서 Realtime 사용 가능**: Supabase Free Tier에서도 Realtime 기능을 무료로 사용할 수 있습니다
   - ⚠️ **제한사항**: 
     - 동시 연결 수 제한 (일반적으로 200개 연결)
     - 월간 데이터 전송량 제한
     - 프로젝트당 최대 2개의 무료 프로젝트
   - 💡 **권장사항**: 
     - 개발/테스트 환경에서는 무료 플랜으로 충분합니다
     - 프로덕션 환경에서는 사용량을 모니터링하고 필요시 Pro 플랜으로 업그레이드 고려
   - 📊 **사용량 확인**: Supabase Dashboard > Settings > Usage에서 Realtime 사용량 확인 가능

---

## 🐛 문제 해결

### Realtime이 작동하지 않는 경우

1. **Supabase Dashboard 확인**
   - Database > Replication에서 테이블별 Realtime이 활성화되어 있는지 확인

2. **마이그레이션 확인**
   - `REPLICA IDENTITY FULL`이 설정되어 있는지 확인
   ```sql
   SELECT relreplident FROM pg_class WHERE relname = 'notifications';
   -- 결과가 'f' (FULL)이어야 함
   ```

3. **RLS 정책 확인**
   - Realtime 구독 시 RLS 정책이 올바르게 설정되어 있는지 확인
   - 테스트를 위해 임시로 RLS를 비활성화해볼 수 있습니다 (프로덕션에서는 권장하지 않음)

4. **네트워크 확인**
   - 방화벽이나 프록시가 WebSocket 연결을 차단하지 않는지 확인

5. **브라우저 콘솔 확인**
   - 개발자 도구 콘솔에서 Realtime 관련 에러 메시지 확인

---

## 📚 참고 자료

- [Supabase Realtime 공식 문서](https://supabase.com/docs/guides/realtime)
- [Realtime 설정 가이드](https://supabase.com/docs/guides/realtime/postgres-changes)
- [RLS와 Realtime](https://supabase.com/docs/guides/realtime/postgres-changes#row-level-security)

---

## ✅ 체크리스트

Realtime 활성화 완료 확인:

- [ ] Supabase Dashboard에서 `notifications` 테이블 Realtime 활성화
- [ ] Supabase Dashboard에서 `comments` 테이블 Realtime 활성화
- [ ] Supabase Dashboard에서 `issues` 테이블 Realtime 활성화
- [ ] 마이그레이션 파일 실행 확인 (`2025-11-29_enable_realtime.sql`)
- [ ] 브라우저에서 WebSocket 연결 확인
- [ ] 알림 실시간 업데이트 테스트
- [ ] 댓글 실시간 업데이트 테스트
- [ ] 칸반 보드 실시간 업데이트 테스트

---

**작성자**: AI Assistant  
**최종 업데이트**: 2025-11-30

---

## 💰 무료 플랜 정보 (2025년 11월 기준)

### ✅ Realtime 무료 사용 가능

Supabase의 **Free Tier**에서도 Realtime 기능을 **무료로 사용할 수 있습니다**.

### 📊 무료 플랜 제한사항

- **동시 연결 수**: 약 200개 연결 (프로젝트당)
- **월간 데이터 전송량**: 제한 있음 (정확한 수치는 Supabase 공식 문서 참고)
- **프로젝트 수**: 최대 2개의 무료 프로젝트

### 💡 권장사항

1. **개발/테스트 환경**: 무료 플랜으로 충분합니다
2. **프로덕션 환경**: 
   - 사용량 모니터링 필수
   - 필요시 Pro 플랜($25/월)으로 업그레이드 고려
   - Pro 플랜에서는 더 많은 연결 수와 데이터 전송량 제공

### 📈 사용량 확인 방법

1. Supabase Dashboard 접속
2. **Settings** > **Usage** 메뉴로 이동
3. Realtime 관련 사용량 확인:
   - 동시 연결 수
   - 데이터 전송량
   - 이벤트 수

### 🔗 최신 가격 정보

최신 가격 정책은 다음 링크에서 확인하세요:
- [Supabase Pricing](https://supabase.com/pricing)
- [Supabase Documentation](https://supabase.com/docs)

**참고**: 가격 정책은 변경될 수 있으므로, 프로덕션 배포 전 최신 정보를 확인하는 것을 권장합니다.

