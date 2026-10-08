# cicd-frontend

동홍동락 1차 세미나 「CI/CD, 어떻게 하는 걸까」 실습용 **프론트 레포**입니다. (React + Vite)
백엔드는 `cicd-backend` 레포에 따로 있습니다.

| 무엇 | 어디서 |
|---|---|
| 검사 (CI) | `.github/workflows/ci.yml` → PR마다 lint · test · build (`frontend-check`) |
| 배포 (CD) | Vercel (이 레포를 연결하면 main 머지마다 자동 배포) |

```bash
npm install
npm run dev     # http://localhost:5173
npm run lint    # oxlint
npm test        # vitest (src/lib/timetable.test.js)
npm run build   # dist/
```

백엔드와 연결하려면 `.env.example` 을 `.env.local` 로 복사합니다. 실습 순서는 함께 받은 가이드북(GUIDE.md)을 따라가면 됩니다.

| 실습 | 하는 것 | 잡히는 곳 |
|---|---|---|
| 1 | 안 쓰는 import 추가 | `frontend-check` → Lint |
| 2 | 시간 표시 `padStart` 제거 ("14:0") | `frontend-check` → Test |
| 3 | import 경로 대소문자 틀리기 | `frontend-check` → Build (리눅스에서만) |
