# Git Flow 문서

> **프로젝트**: SumUp  
> **버전**: 1.0  
> **날짜**: 2025-11-29  
> **상태**: 초안

---

## 1. 개요

### 1.1 목적
본 문서는 SumUp 프로젝트의 Git 워크플로우 및 브랜치 전략을 설명합니다.

### 1.2 브랜치 전략
- **main**: 프로덕션 준비 코드
- **dev**: 개발 브랜치
- **feature/***: 기능 브랜치
- **fix/***: 버그 수정 브랜치
- **hotfix/***: 핫픽스 브랜치

---

## 2. 브랜치 구조

### 2.1 메인 브랜치

#### 2.1.1 main
- 프로덕션 준비 코드
- 보호된 브랜치
- `dev`에서 Pull Request를 통해서만 병합
- 태그된 릴리스

#### 2.1.2 dev
- 개발 통합 브랜치
- 모든 기능 브랜치가 여기로 병합
- 직접 병합 허용 (PR 불필요)
- 기능 브랜치에서 정기적으로 병합

---

## 3. 브랜치 워크플로우

### 3.1 기능 개발

#### 3.1.1 기능 브랜치 생성
```bash
# dev에서 시작
git checkout dev
git pull origin dev

# 기능 브랜치 생성
git checkout -b feature/feature-name

# 또는 축약형 사용
git checkout -b feature/feature-name dev
```

#### 3.1.2 기능 작업
```bash
# 변경사항 만들고 커밋
git add .
git commit -m "feat: add feature description"

# 원격에 푸시
git push origin feature/feature-name
```

#### 3.1.3 dev로 병합
```bash
# dev로 전환
git checkout dev
git pull origin dev

# 기능 브랜치 병합 (직접 병합, PR 없음)
git merge feature/feature-name

# 원격에 푸시
git push origin dev

# 기능 브랜치 삭제 (선택사항)
git branch -d feature/feature-name
git push origin --delete feature/feature-name
```

### 3.2 버그 수정

#### 3.2.1 수정 브랜치 생성
```bash
# dev에서 시작
git checkout dev
git pull origin dev

# 수정 브랜치 생성
git checkout -b fix/bug-description
```

#### 3.2.2 dev로 수정 병합
```bash
# 기능 브랜치와 동일한 프로세스
git checkout dev
git pull origin dev
git merge fix/bug-description
git push origin dev
```

### 3.3 핫픽스

#### 3.3.1 핫픽스 브랜치 생성
```bash
# main에서 시작
git checkout main
git pull origin main

# 핫픽스 브랜치 생성
git checkout -b hotfix/hotfix-description
```

#### 3.3.2 핫픽스 병합
```bash
# main에 병합
git checkout main
git merge hotfix/hotfix-description
git push origin main

# dev에 병합
git checkout dev
git merge hotfix/hotfix-description
git push origin dev

# 핫픽스 브랜치 삭제
git branch -d hotfix/hotfix-description
git push origin --delete hotfix/hotfix-description
```

---

## 4. 커밋 메시지 컨벤션

### 4.1 형식
```
type: short description (max 50 chars)

Longer description if needed
- Bullet points for details
- Reference issue numbers

Fixes #123
```

### 4.2 타입
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 스타일 변경 (포맷팅 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가 또는 변경
- `chore`: 빌드 프로세스 또는 보조 도구 변경

### 4.3 가이드라인
- 영어 사용
- 명령형 사용
- 첫 줄은 50자 이하
- 메인/기능 변경에 집중
- 가능한 경우 설명을 3줄 이하로 유지
- 해당되는 경우 이슈 참조

### 4.4 예시
```
feat: add user authentication

fix: resolve login redirect issue

docs: update API documentation

refactor: simplify component structure
```

---

## 5. Pull Request 프로세스

### 5.1 dev 브랜치로 PR
- **필수 아님**: 직접 병합 허용
- 필요한 경우 코드 리뷰에 사용
- 필요한 경우 토론에 사용

### 5.2 main 브랜치로 PR
- **필수**: main으로의 모든 병합은 PR을 거쳐야 함
- 최소 한 명의 승인 필요
- 모든 체크 통과 필요
- 명확한 설명 필요

### 5.3 PR 템플릿
```markdown
## Description
변경사항에 대한 간단한 설명

## Type of Change
- [ ] Feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring
- [ ] Other

## Related Issues
Closes #123

## Testing
- [ ] Tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project conventions
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Error handling implemented
```

---

## 6. 원격 저장소

### 6.1 원격 URL
```
https://github.com/gr22nist/sum-up.git
```

### 6.2 원격 설정
```bash
# 현재 원격 확인
git remote -v

# 원격 추가 (설정되지 않은 경우)
git remote add origin https://github.com/gr22nist/sum-up.git

# 원격 URL 업데이트 (필요한 경우)
git remote set-url origin https://github.com/gr22nist/sum-up.git
```

---

## 7. 일반적인 워크플로우

### 7.1 새 기능 시작
```bash
# dev 업데이트
git checkout dev
git pull origin dev

# 기능 브랜치 생성
git checkout -b feature/new-feature

# 개발 시작
```

### 7.2 일일 워크플로우
```bash
# 기능 브랜치에서 시작
git checkout feature/feature-name

# dev에서 최신 변경사항 가져오기
git pull origin dev

# 변경사항 만들고 커밋
git add .
git commit -m "feat: description"

# 원격에 푸시
git push origin feature/feature-name
```

### 7.3 기능 완료
```bash
# 모든 변경사항이 커밋되었는지 확인
git status

# dev로 전환
git checkout dev
git pull origin dev

# 기능 병합
git merge feature/feature-name

# 원격에 푸시
git push origin dev

# 로컬 브랜치 삭제
git branch -d feature/feature-name

# 원격 브랜치 삭제
git push origin --delete feature/feature-name
```

### 7.4 원격과 동기화
```bash
# 최신 변경사항 가져오기
git fetch origin

# 로컬 브랜치 업데이트
git pull origin branch-name

# 또는 리베이스 (선호하는 경우)
git pull --rebase origin branch-name
```

---

## 8. 모범 사례

### 8.1 브랜치 관리
- 브랜치를 단일 기능/수정에 집중
- 병합된 브랜치를 정기적으로 삭제
- 브랜치 이름을 설명적으로 유지
- 일관된 명명 규칙 사용

### 8.2 커밋 사례
- 의미 있는 메시지로 자주 커밋
- 커밋을 원자적으로 유지 (하나의 논리적 변경)
- 깨진 코드 커밋하지 않음
- 커밋 전에 변경사항 검토

### 8.3 병합 사례
- 병합 전에 항상 최신 변경사항 가져오기
- 충돌을 신중하게 해결
- 병합 후 테스트
- 병합 커밋을 깨끗하게 유지

### 8.4 커뮤니케이션
- 팀에 브랜치 상태 업데이트
- 주요 변경사항 커뮤니케이션
- 복잡한 변경사항 문서화
- 커밋에서 이슈 참조

---

## 9. 문제 해결

### 9.1 일반적인 문제

#### 병합 충돌
```bash
# 최신 변경사항 가져오기
git pull origin branch-name

# 파일에서 충돌 해결
# 충돌된 파일 편집

# 해결된 파일 스테이징
git add .

# 병합 완료
git commit -m "merge: resolve conflicts"
```

#### 마지막 커밋 취소
```bash
# 변경사항 유지
git reset --soft HEAD~1

# 변경사항 버리기
git reset --hard HEAD~1
```

#### dev에서 브랜치 업데이트
```bash
# 기능 브랜치로 전환
git checkout feature/feature-name

# 최신 dev 병합
git merge dev

# 또는 리베이스 (선호하는 경우)
git rebase dev
```

---

## 10. 릴리스 프로세스

### 10.1 릴리스 준비
```bash
# dev가 최신인지 확인
git checkout dev
git pull origin dev

# 릴리스 브랜치 생성 (선택사항)
git checkout -b release/v1.0.0

# 최종 조정
# 버전 번호 업데이트
# 변경 로그 업데이트

# PR을 통해 main에 병합
```

### 10.2 릴리스 태깅
```bash
# main에 병합 후
git checkout main
git pull origin main

# 태그 생성
git tag -a v1.0.0 -m "Release version 1.0.0"

# 태그 푸시
git push origin v1.0.0
```

---

## 11. 빠른 참조

### 11.1 일반적인 명령어
```bash
# 브랜치 작업
git checkout -b feature/name
git branch -d branch-name
git branch -a

# 상태 및 diff
git status
git diff
git log --oneline

# 원격 작업
git fetch origin
git pull origin branch-name
git push origin branch-name

# 병합 작업
git merge branch-name
git rebase branch-name
```

### 11.2 워크플로우 요약
1. dev에서 기능 브랜치 생성
2. 변경사항 개발 및 커밋
3. dev에 병합 (직접 병합)
4. dev에서 main으로 PR 생성
5. 리뷰 후 main에 병합
6. 필요한 경우 릴리스 태그

---

## 문서 이력

| 버전 | 날짜 | 작성자 | 변경사항 |
|------|------|--------|---------|
| 1.0 | 2025-11-29 | Initial | 초기 Git flow 문서 작성 |

---

**문서 종료**
