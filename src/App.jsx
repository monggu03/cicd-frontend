import { useEffect, useState } from 'react'
import SessionTable from './components/SessionTable.jsx'
import { fetchHello, fetchSessions, hasServer } from './api/client.js'
import { buildTimetable, totalMinutes } from './lib/timetable.js'

// 세미나 시작 시각 (실제 일정에 맞게 바꿔도 됩니다)
const START_TIME = '14:00'

// Vercel이 빌드할 때 자동으로 넣어 주는 값들입니다. 로컬에서는 비어 있습니다.
//   VITE_VERCEL_ENV            : production / preview / development
//   VITE_VERCEL_GIT_COMMIT_SHA : 이 화면을 만든 커밋 번호
const DEPLOY_ENV = import.meta.env.VITE_VERCEL_ENV ?? 'local'
const COMMIT = import.meta.env.VITE_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) ?? 'local'

export default function App() {
  const [sessions, setSessions] = useState([])
  const [hello, setHello] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchSessions().then(setSessions).catch((e) => setError(e.message))
    fetchHello().then(setHello).catch((e) => setError(e.message))
  }, [])

  const rows = buildTimetable(START_TIME, sessions)

  return (
    <main className="page">
      <header className="header">
        <p className="eyebrow">GDGoC DGU × HIU</p>
        <h1>
          동홍동락 <span className="accent">1차 세미나</span>
        </h1>
        <p className="sub">타임테이블 · 총 {totalMinutes(sessions)}분</p>
      </header>

      <ServerBanner hello={hello} error={error} />

      <SessionTable rows={rows} />

      <footer className="footer">
        <span className={`badge badge-${DEPLOY_ENV}`}>{DEPLOY_ENV}</span>
        <span>
          커밋 <code>{COMMIT}</code>
        </span>
      </footer>
    </main>
  )
}

function ServerBanner({ hello, error }) {
  if (error) return <p className="banner banner-error">⚠️ {error}</p>
  if (!hasServer()) {
    return <p className="banner">🧪 백엔드 주소(VITE_API_URL)가 없어 샘플 데이터를 보여 줍니다.</p>
  }
  if (!hello) return <p className="banner">⏳ 서버에 연결하는 중…</p>
  return (
    <p className="banner banner-ok">
      ☁️ {hello.message} <code>{hello.revision}</code>
    </p>
  )
}
