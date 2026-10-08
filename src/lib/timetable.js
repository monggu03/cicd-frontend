// 타임테이블 계산을 담당하는 "순수 함수" 모음입니다.
// 화면(React)과 분리해 두었기 때문에 브라우저 없이도 테스트할 수 있습니다.
// → CI에서 `npm test`가 검사하는 대상이 바로 이 파일입니다.

/** "14:05" → 845 (자정부터 몇 분째인지) */
export function toMinutes(hhmm) {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** 845 → "14:05" (두 자리 맞추기 padStart가 핵심) */
export function toHHMM(totalMinutes) {
  const h = Math.floor(totalMinutes / 60) % 24
  const m = totalMinutes % 60
  return `${h}:${m}`
}

/**
 * 시작 시각과 세션 목록을 받아 각 세션의 시작·종료 시각을 붙여 줍니다.
 * 세션은 order 순서대로 정렬한 뒤 앞에서부터 이어 붙입니다.
 */
export function buildTimetable(startTime, sessions) {
  let cursor = toMinutes(startTime)
  return [...sessions]
    .sort((a, b) => a.order - b.order)
    .map((session) => {
      const start = cursor
      cursor += session.minutes
      return { ...session, start: toHHMM(start), end: toHHMM(cursor) }
    })
}

/** 전체 진행 시간(분) */
export function totalMinutes(sessions) {
  return sessions.reduce((sum, session) => sum + session.minutes, 0)
}
