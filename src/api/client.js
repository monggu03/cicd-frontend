// 백엔드(Spring Boot, Cloud Run) 주소는 환경 변수로 받습니다.
//   - 로컬:   .env.local 에  VITE_API_URL=http://localhost:8080
//   - Vercel: Project Settings → Environment Variables 에 VITE_API_URL 등록
// 주소가 없으면 아래 샘플 데이터를 씁니다. → 백엔드가 없어도 프론트 배포부터 해 볼 수 있습니다.
const API_URL = import.meta.env.VITE_API_URL

export const SAMPLE_SESSIONS = [
  { order: 1, title: '오프닝', speaker: '운영진', school: '공동', minutes: 10 },
  { order: 2, title: 'CI/CD, 어떻게 하는 걸까', speaker: '이도윤', school: '동국대', minutes: 20 },
  { order: 3, title: '홍익대 세션', speaker: '홍익대 스피커', school: '홍익대', minutes: 20 },
  { order: 4, title: '네트워킹', speaker: '모두', school: '공동', minutes: 30 },
]

export function hasServer() {
  return Boolean(API_URL)
}

export async function fetchSessions() {
  if (!API_URL) return SAMPLE_SESSIONS
  const res = await fetch(`${API_URL}/api/sessions`)
  if (!res.ok) throw new Error(`세션 목록을 못 불러왔습니다 (HTTP ${res.status})`)
  return res.json()
}

export async function fetchHello() {
  if (!API_URL) return null
  const res = await fetch(`${API_URL}/api/hello`)
  if (!res.ok) throw new Error(`서버 인사말을 못 불러왔습니다 (HTTP ${res.status})`)
  return res.json()
}
