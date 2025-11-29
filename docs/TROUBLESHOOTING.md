# 트러블슈팅 가이드

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개요

### 1.1 목적
본 문서는 SumUp 프로젝트 개발 및 배포 중 발생할 수 있는 일반적인 문제와 해결 방법을 제공합니다.

### 1.2 사용 방법
1. 발생한 문제를 카테고리별로 찾아보세요
2. 해결 방법을 따라 문제를 해결하세요
3. 문제가 해결되지 않으면 이슈를 생성하세요

---

## 2. 설치 및 설정 문제

### 2.1 npm install 실패

#### 문제
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

#### 해결 방법
1. **node_modules 삭제 후 재설치**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **npm 캐시 클리어**:
   ```bash
   npm cache clean --force
   npm install
   ```

3. **Node.js 버전 확인**:
   - Node.js 20.x LTS 사용 확인
   - `node --version`으로 버전 확인

#### 예방 방법
- `package-lock.json`을 Git에 커밋하여 일관성 유지
- 팀원 모두 동일한 Node.js 버전 사용

---

### 2.2 TypeScript 에러

#### 문제
```bash
error TS2307: Cannot find module '@hua-labs/ui'
```

#### 해결 방법
1. **@hua-labs/ui 패키지 설치 확인**:
   ```bash
   # 패키지가 로컬 tarball인 경우
   npm install ../hua-platform/packages/hua-ui/hua-labs-ui-1.0.0.tgz
   ```

2. **tsconfig.json 경로 확인**:
   ```json
   {
     "compilerOptions": {
       "paths": {
         "@/*": ["./src/*"]
       }
     }
   }
   ```

3. **타입 정의 파일 확인**:
   - `@hua-labs/ui` 패키지에 타입 정의가 포함되어 있는지 확인

---

### 2.3 환경 변수 미적용

#### 문제
환경 변수가 적용되지 않음

#### 해결 방법
1. **파일 이름 확인**:
   - `.env.local` 파일이 프로젝트 루트에 있는지 확인
   - `.env.example`을 참고하여 올바른 변수명 사용

2. **변수명 확인**:
   - Next.js에서 클라이언트 측 사용 시 `NEXT_PUBLIC_` 접두사 필요
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com
   ```

3. **서버 재시작**:
   ```bash
   # 개발 서버 재시작
   npm run dev
   ```

---

## 3. 빌드 문제

### 3.1 빌드 실패

#### 문제
```bash
Error: Cannot find module 'xxx'
```

#### 해결 방법
1. **의존성 확인**:
   ```bash
   npm install
   ```

2. **타입 에러 확인**:
   ```bash
   npm run lint
   ```

3. **빌드 로그 확인**:
   ```bash
   npm run build
   # 에러 메시지 자세히 확인
   ```

---

### 3.2 메모리 부족

#### 문제
```bash
FATAL ERROR: Reached heap limit
```

#### 해결 방법
1. **Node.js 메모리 증가**:
   ```bash
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

2. **package.json 스크립트 수정**:
   ```json
   {
     "scripts": {
       "build": "NODE_OPTIONS='--max-old-space-size=4096' next build"
     }
   }
   ```

---

## 4. 런타임 문제

### 4.1 페이지 로드 실패

#### 문제
페이지가 로드되지 않거나 404 에러 발생

#### 해결 방법
1. **라우트 확인**:
   - `src/app/` 디렉토리 구조 확인
   - 파일 이름이 올바른지 확인 (Next.js App Router 규칙)

2. **동적 라우트 확인**:
   - `[id]` 폴더 구조 확인
   - `page.tsx` 파일 존재 확인

3. **개발 서버 재시작**:
   ```bash
   npm run dev
   ```

---

### 4.2 API 호출 실패

#### 문제
API 호출이 실패하거나 CORS 에러 발생

#### 해결 방법
1. **환경 변수 확인**:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.example.com
   ```

2. **CORS 문제 해결**:
   - Next.js API 라우트를 통한 프록시 사용
   - `src/app/api/proxy/` 디렉토리에 프록시 라우트 생성

3. **에러 로그 확인**:
   - 브라우저 콘솔 확인
   - 네트워크 탭에서 요청/응답 확인

---

### 4.3 상태 관리 문제

#### 문제
Zustand store가 업데이트되지 않음

#### 해결 방법
1. **store 구조 확인**:
   - `src/store/` 디렉토리의 store 파일 확인
   - 상태 업데이트 함수가 올바르게 구현되었는지 확인

2. **컴포넌트 리렌더링 확인**:
   - `useStore` 훅 사용 확인
   - 선택자(selector) 사용 확인

3. **localStorage 동기화 확인**:
   - `persist` 미들웨어 사용 시 localStorage 확인
   - 브라우저 개발자 도구에서 Application → Local Storage 확인

---

## 5. UI/UX 문제

### 5.1 스타일이 적용되지 않음

#### 문제
Tailwind CSS 클래스가 적용되지 않음

#### 해결 방법
1. **Tailwind 설정 확인**:
   - `tailwind.config.ts` 또는 `postcss.config.mjs` 확인
   - `globals.css`에 `@import "tailwindcss"` 확인

2. **빌드 캐시 클리어**:
   ```bash
   rm -rf .next
   npm run dev
   ```

3. **클래스명 확인**:
   - Tailwind CSS 4 문법 확인
   - 올바른 클래스명 사용 확인

---

### 5.2 반응형 디자인 문제

#### 문제
모바일에서 레이아웃이 깨짐

#### 해결 방법
1. **미디어 쿼리 확인**:
   - Tailwind 반응형 클래스 사용 확인
   - `sm:`, `md:`, `lg:` 등 브레이크포인트 확인

2. **뷰포트 메타 태그 확인**:
   - `src/app/layout.tsx`에 뷰포트 설정 확인

3. **브라우저 개발자 도구 사용**:
   - 반응형 모드로 테스트
   - 다양한 화면 크기 테스트

---

### 5.3 다크 모드 문제

#### 문제
다크 모드가 적용되지 않음

#### 해결 방법
1. **테마 설정 확인**:
   - `usePreferencesStore`에서 테마 설정 확인
   - `AppProviders`에서 테마 동기화 확인

2. **CSS 변수 확인**:
   - `globals.css`에 다크 모드 변수 정의 확인
   - `data-theme` 속성 확인

3. **시스템 테마 감지 확인**:
   - `ThemeSyncBridge` 컴포넌트 확인
   - 브라우저 시스템 설정 확인

---

## 6. 성능 문제

### 6.1 느린 페이지 로딩

#### 문제
페이지 로딩이 느림

#### 해결 방법
1. **이미지 최적화**:
   - Next.js Image 컴포넌트 사용
   - 이미지 크기 최적화

2. **코드 스플리팅**:
   - 동적 import 사용
   - 큰 컴포넌트 지연 로딩

3. **번들 크기 확인**:
   ```bash
   npm run build
   # 빌드 출력에서 번들 크기 확인
   ```

---

### 6.2 메모리 누수

#### 문제
메모리 사용량이 계속 증가

#### 해결 방법
1. **이벤트 리스너 정리**:
   - `useEffect`에서 cleanup 함수 구현
   - 이벤트 리스너 제거

2. **구독 해제**:
   - Zustand store 구독 해제
   - API 요청 취소

3. **메모이제이션 확인**:
   - 불필요한 리렌더링 방지
   - `useMemo`, `useCallback` 사용

---

## 7. Git 및 배포 문제

### 7.1 Git 충돌

#### 문제
병합 충돌 발생

#### 해결 방법
1. **충돌 파일 확인**:
   ```bash
   git status
   ```

2. **충돌 해결**:
   - 충돌 마커(`<<<<<<<`, `=======`, `>>>>>>>`) 확인
   - 수동으로 충돌 해결
   - `git add` 후 커밋

3. **예방 방법**:
   - 자주 `dev` 브랜치와 동기화
   - 작은 단위로 커밋

---

### 7.2 Vercel 배포 실패

#### 문제
Vercel 배포가 실패함

#### 해결 방법
1. **빌드 로그 확인**:
   - Vercel 대시보드에서 배포 로그 확인
   - 에러 메시지 확인

2. **환경 변수 확인**:
   - Vercel 대시보드에서 환경 변수 설정 확인
   - `NEXT_PUBLIC_` 접두사 확인

3. **로컬 빌드 테스트**:
   ```bash
   npm run build
   # 로컬에서 빌드 성공 확인
   ```

---

## 8. 타입 에러

### 8.1 TypeScript 타입 에러

#### 문제
```typescript
Type 'X' is not assignable to type 'Y'
```

#### 해결 방법
1. **타입 정의 확인**:
   - `src/types/index.ts`에서 타입 정의 확인
   - 타입이 올바르게 정의되었는지 확인

2. **타입 단언 사용** (임시):
   ```typescript
   const value = data as ExpectedType;
   ```

3. **타입 가드 사용**:
   ```typescript
   if (isValidType(data)) {
     // 타입이 안전한 영역
   }
   ```

---

### 8.2 any 타입 경고

#### 문제
ESLint에서 `any` 타입 사용 경고

#### 해결 방법
1. **명시적 타입 정의**:
   ```typescript
   // Before
   function process(data: any) { }
   
   // After
   function process(data: User | Project) { }
   ```

2. **제네릭 사용**:
   ```typescript
   function process<T>(data: T): T { }
   ```

---

## 9. 접근성 문제

### 9.1 키보드 네비게이션 문제

#### 문제
키보드로 모든 기능을 사용할 수 없음

#### 해결 방법
1. **접근성 유틸리티 사용**:
   - `src/lib/utils/accessibility.ts`의 유틸리티 함수 사용
   - `isKey`, `isActivationKey` 등 사용

2. **포커스 관리**:
   - `createFocusTrap` 사용
   - `tabIndex` 속성 확인

3. **ARIA 레이블 추가**:
   - `aria-label`, `aria-labelledby` 사용
   - 스크린 리더 테스트

---

## 10. 일반적인 해결 방법

### 10.1 문제 해결 체크리스트
1. [ ] 에러 메시지를 자세히 읽었는가?
2. [ ] 관련 문서를 확인했는가?
3. [ ] 로컬 환경에서 재현되는가?
4. [ ] 최신 코드로 업데이트했는가?
5. [ ] 캐시를 클리어했는가?
6. [ ] 의존성을 재설치했는가?

### 10.2 도움 요청
문제가 해결되지 않으면:
1. **이슈 생성**: GitHub에 이슈 생성
2. **에러 로그 포함**: 에러 메시지 및 스택 트레이스 포함
3. **재현 단계 설명**: 문제를 재현하는 단계 설명
4. **환경 정보 제공**: Node.js 버전, OS 등 환경 정보

---

## 11. 참고 자료

### 11.1 관련 문서
- [README.md](../README.md) - 프로젝트 개요
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 배포 가이드
- [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) - API 문서
- [REFACTORING_GUIDE.md](./REFACTORING_GUIDE.md) - 리팩토링 가이드

### 11.2 외부 자료
- [Next.js 공식 문서](https://nextjs.org/docs)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Vercel 문서](https://vercel.com/docs)

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|---------|
| 1.0 | 2025-11-29 | Initial | 초기 트러블슈팅 가이드 작성 |

---

**문서 종료**

