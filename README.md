## 📘 Gitmon Client

> **Gitmon**은 블로그 운영만으로 Git 저장소까지 함께 관리되도록 설계된, 마크다운 기반 블로그 플랫폼입니다. 개발자는 블로그 관리만 하면 Git 커밋과 버전 관리까지 자동으로 이뤄지므로, 따로 Git을 신경 쓸 필요가 없습니다. 개발 블로그를 운영하면서 자연스럽게 Git 활동이 누적되어, 성실한 개발자처럼 보이는 효과도 얻을 수 있습니다.

---

### ✨ 주요 기능 및 UI 구성

#### 📝 마크다운 기반 포스트 관리

- `/posts` 디렉토리 내 마크다운 파일을 자동으로 인식하여 블로그 글로 렌더링합니다.
- 포스트 메타데이터는 greymatter를 통해 정의하며, 날짜, 태그, 요약 등을 설정할 수 있습니다.

#### 🧭 블로그 홈

- 최신 포스트를 정렬하여 목록 형태로 보여줍니다.
- 각 포스트는 제목, 요약, 작성일 정보와 함께 카드 UI로 표시됩니다.

#### 📄 포스트 상세 페이지

- 마크다운을 HTML로 변환하여 콘텐츠를 정갈하게 보여줍니다.
- 코드 하이라이팅, 이미지, 링크 등을 지원합니다.

---

### 🛠 사용 기술

**프레임워크 & 언어**: React, Next.js (App Router), TypeScript

**스타일 & UI 구성**: Tailwind CSS, shadcn/ui, lucide-react

**상태 및 데이터 관리**: TanStack Query, React Hook Form, Zod

**마크다운 처리**: gray-matter, react-markdown, remark-gfm

---

### 🚀 시작하기

```bash
# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm --filter=gitmon-blog dev
```

---

### 📡 백엔드 레포지토리

- [https://github.com/ixfp/gitmon](https://github.com/ixfp/gitmon)

---

### 📌 기획 배경

Gitmon은 개발자가 가장 익숙한 Git을 기반으로 콘텐츠를 관리할 수 있다는 장점에 집중한 프로젝트입니다. 블로그에서 글만 쓰면 Git 커밋까지 자동으로 관리되는 블로그를 만들고자 했습니다.
