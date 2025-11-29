# SumUp 문서 인덱스

> **프로젝트**: SumUp  
> **업데이트**: 2025-11-29

---

## 문서 목록

### 필수 읽기 문서

1. **[WORKING_GUIDELINES.md](./WORKING_GUIDELINES.md)** - 작업 가이드라인
   - 모든 작업자를 위한 협업 원칙 및 작업 규칙
   - 문서 작성 규칙, 코드 품질 기준, 개발 진행 관리
   - **모든 작업자는 반드시 먼저 읽어야 합니다**

2. **[DEVELOPMENT_LOG.md](./DEVELOPMENT_LOG.md)** - 개발 로그
   - 프로젝트 개발 진행 내역 기록
   - 작업 완료 시 즉시 기록 (최신 항목이 위에 오도록)
   - **모든 작업자는 작업 완료 시 반드시 기록해야 합니다**

### 핵심 문서

2. **[PRD.md](./PRD.md)** - 제품 요구사항 문서
   - 프로젝트의 목적, 범위, 기능 요구사항 정의
   - Vibe Coding Hackathon을 위한 SumUp 프로젝트 요구사항

3. **[DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)** - 개발 계획서
   - 개발 단계별 계획 및 일정
   - 기술 스택 및 아키텍처 설계
   - 진행 상황 및 다음 단계

4. **[COLLABORATION_GUIDELINES.md](./COLLABORATION_GUIDELINES.md)** - 협업 가이드라인
   - 팀 협업 규칙 및 커뮤니케이션 방법
   - 코드 리뷰 및 품질 관리

5. **[GITFLOW.md](./GITFLOW.md)** - Git 워크플로우
   - 브랜치 전략 및 커밋 컨벤션
   - Pull Request 프로세스

### 디자인 문서

5. **[UI_DESIGN_GUIDELINES.md](./UI_DESIGN_GUIDELINES.md)** - UI 디자인 가이드라인
   - 디자인 시스템 및 컴포넌트 가이드
   - 색상, 타이포그래피, 간격 등 디자인 토큰
   - 아이콘 시스템 (통합됨)

### 개발 문서

6. **[COMPONENTS.md](./COMPONENTS.md)** - 컴포넌트 문서
   - 재사용 가능한 컴포넌트 목록 및 사용법
   - 컴포넌트 API 및 예제
   - 컴포넌트 개발 현황 및 우선순위
   - hua-ui 패키지 사용 가이드

7. **[CODE_REVIEW.md](./CODE_REVIEW.md)** - 코드 리뷰 보고서
   - 현재 코드의 타입 안전성 이슈
   - 코드 중복 문제 및 개선 방안
   - 로직 분리 개선 사항
   - 우선순위별 개선 항목
   - **모든 작업자는 반드시 확인해야 합니다**

8. **[REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md)** - 리팩토링 분석 및 가이드
   - 공통 로직 분석 및 추출 계획
   - 코드 품질 개선 가이드라인
   - 성능 최적화 방법
   - 레퍼런스 프로젝트 패턴 (통합됨)

### 운영 문서

11. **[BACKEND_API_GUIDE.md](./BACKEND_API_GUIDE.md)** - 백엔드 API 개발 가이드
    - Next.js API Routes 구현 방법
    - 목 데이터 구조 및 관리
    - API 엔드포인트 및 사용 방법
    - 요청/응답 형식 및 에러 처리
    - 인증 미들웨어
    - AI 기능 설정 및 사용 가이드 (통합됨)

12. **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - 배포 가이드
    - Vercel 배포 방법
    - 환경 변수 설정
    - 배포 후 확인 사항

13. **[TROUBLESHOOTING.md](./TROUBLESHOOTING.md)** - 트러블슈팅 가이드
    - 일반적인 문제 및 해결 방법
    - 설치/설정 문제
    - 빌드/런타임 문제

14. **[DOCUMENT_VERSIONING.md](./DOCUMENT_VERSIONING.md)** - 문서 버전 관리 가이드
    - 문서 버전 관리 규칙
    - 변경 이력 기록 방법
    - 문서 상태 관리

15. **[SUPABASE_SETUP_GUIDE.md](./SUPABASE_SETUP_GUIDE.md)** - Supabase 설정 가이드
    - Supabase 프로젝트 생성 및 설정
    - 데이터베이스 스키마 설계
    - 인증 구현 (회원가입, 로그인, Google OAuth)
      - 회원가입 페이지: 3단계 프로세스 (이메일 → 비밀번호 → 약관)
      - 비밀번호 검증: 실시간 검증 및 체크리스트
      - sum-diary 프로젝트에서 가져와 디자인 개선
    - 시간 절약 전략

16. **[CODE_SPLITTING_GUIDE.md](./CODE_SPLITTING_GUIDE.md)** - 코드 스플리팅 가이드
    - Next.js Dynamic Import 사용법
    - 스플리팅 대상 및 적용 방법
    - 성능 최적화 전략

### 통합된 문서 (백업 폴더로 이동)

다음 문서들은 관련 문서에 통합되어 백업 폴더로 이동되었습니다:
- `AI_SETUP_GUIDE.md` → `BACKEND_API_GUIDE.md` (12. AI 기능 설정 및 사용 가이드)
- `AI_IMPLEMENTATION_SUMMARY.md` → `BACKEND_API_GUIDE.md` (12. AI 기능 설정 및 사용 가이드)
- `ICON_USAGE.md` → `UI_DESIGN_GUIDELINES.md` (13. 아이콘 시스템)
- `REFERENCE_PATTERNS.md` → `REFACTORING_ANALYSIS.md` (6. 레퍼런스 프로젝트 패턴)
- `NEXT_FEATURES.md` → `DEVELOPMENT_PLAN.md` (13. 다음 구현할 메인 피처 제안)
- `PRD_COMPARISON_ANALYSIS.md` → 백업 (분석 완료, 참고용)

---

## 빠른 링크

- **GitHub 저장소**: [https://github.com/gr22nist/sum-up](https://github.com/gr22nist/sum-up)
- **프로젝트 루트**: [../README.md](../README.md)

---

## 문서 업데이트 가이드

문서를 업데이트할 때는 다음을 확인하세요:

1. **프로젝트 이름**: 모든 문서에서 "SumUp"으로 통일
2. **저장소 URL**: `https://github.com/gr22nist/sum-up`
3. **날짜**: 문서 수정 시 날짜 업데이트
4. **상태**: 문서 상태 표시 (초안/진행중/완료)
5. **버전 관리**: [문서 버전 관리 가이드](./DOCUMENT_VERSIONING.md) 참조

---

## 문서 구조

```
docs/
├── README.md                          # 문서 인덱스 (현재 파일)
├── PRD.md                             # 제품 요구사항 문서
├── DEVELOPMENT_PLAN.md                # 개발 계획서 (향후 기능 포함)
├── DEVELOPMENT_LOG.md                 # 개발 로그 (실시간 작성)
├── COLLABORATION_GUIDELINES.md         # 협업 가이드라인
├── GITFLOW.md                         # Git 워크플로우
├── UI_DESIGN_GUIDELINES.md            # UI 디자인 가이드라인 (아이콘 시스템 포함)
├── COMPONENTS.md                      # 컴포넌트 문서
├── CODE_REVIEW.md                     # 코드 리뷰 보고서
├── REFACTORING_ANALYSIS.md            # 리팩토링 분석 및 가이드 (레퍼런스 패턴 포함)
├── CODE_SPLITTING_GUIDE.md            # 코드 스플리팅 가이드
├── BACKEND_API_GUIDE.md               # 백엔드 API 개발 가이드 (AI 기능 포함)
├── DEPLOYMENT_GUIDE.md                # 배포 가이드
├── TROUBLESHOOTING.md                 # 트러블슈팅 가이드
├── DOCUMENT_VERSIONING.md             # 문서 버전 관리 가이드
├── SUPABASE_SETUP_GUIDE.md            # Supabase 설정 가이드
├── WORKING_GUIDELINES.md              # 작업 가이드라인
└── backup/                            # 백업 문서 (gitignore)
    ├── PRD_EN_VER.md                  # 원본 PRD (영문)
    ├── PRD_KR_VER.md                  # 원본 PRD (한글)
    ├── AI_SETUP_GUIDE.md              # AI 설정 가이드 (통합됨)
    ├── AI_IMPLEMENTATION_SUMMARY.md   # AI 구현 요약 (통합됨)
    ├── ICON_USAGE.md                  # 아이콘 사용 가이드 (통합됨)
    ├── REFERENCE_PATTERNS.md          # 레퍼런스 패턴 (통합됨)
    ├── NEXT_FEATURES.md               # 다음 기능 제안 (통합됨)
    ├── PRD_COMPARISON_ANALYSIS.md     # PRD 비교 분석 (참고용)
    └── ... (기타 통합된 문서들)
```

---

## 프로젝트 개요

**SumUp**은 Vibe Coding Hackathon을 위한 프로젝트 관리 및 이슈 트래킹 시스템입니다.

### 주요 기능
- 프로젝트 관리
- 이슈 트래킹
- 칸반 보드
- 대시보드
- 협업 기능

### 기술 스택
- Next.js 16.0.3
- React 19.2.0
- TypeScript 5
- Tailwind CSS 4
- Zustand 5.0.8

---

**마지막 업데이트**: 2025-11-29  
**문서 버전**: 1.1.0

**최근 변경사항** (2025-11-29):
- AI 관련 문서 통합: `AI_SETUP_GUIDE.md`, `AI_IMPLEMENTATION_SUMMARY.md` → `BACKEND_API_GUIDE.md`
- 아이콘 사용 가이드 통합: `ICON_USAGE.md` → `UI_DESIGN_GUIDELINES.md`
- 레퍼런스 패턴 통합: `REFERENCE_PATTERNS.md` → `REFACTORING_ANALYSIS.md`
- 향후 기능 제안 통합: `NEXT_FEATURES.md` → `DEVELOPMENT_PLAN.md`
- PRD 비교 분석 백업: `PRD_COMPARISON_ANALYSIS.md` → `backup/`

