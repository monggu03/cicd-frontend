// Vitest 테스트 파일입니다. `npm test`로 실행합니다.
// CI(GitHub Actions)도 PR마다 똑같이 `npm test`를 실행합니다.
import { describe, expect, it } from 'vitest'
import { buildTimetable, toHHMM, toMinutes, totalMinutes } from './timetable.js'

const sessions = [
  { order: 2, title: 'CI/CD, 어떻게 하는 걸까', minutes: 20 },
  { order: 1, title: '오프닝', minutes: 5 },
  { order: 3, title: '네트워킹', minutes: 40 },
]

describe('시간 변환', () => {
  it('"14:05"는 845분이다', () => {
    expect(toMinutes('14:05')).toBe(845)
  })

  it('845분은 "14:05"로 표시한다 (한 자리 분도 두 자리로)', () => {
    expect(toHHMM(845)).toBe('14:05')
  })

  it('자정을 넘기면 00시부터 다시 센다', () => {
    expect(toHHMM(24 * 60 + 30)).toBe('00:30')
  })
})

describe('buildTimetable', () => {
  it('order 순서대로 정렬해서 시작·종료 시각을 붙인다', () => {
    const table = buildTimetable('14:00', sessions)

    expect(table.map((s) => s.title)).toEqual(['오프닝', 'CI/CD, 어떻게 하는 걸까', '네트워킹'])
    expect(table[0]).toMatchObject({ start: '14:00', end: '14:05' })
    expect(table[1]).toMatchObject({ start: '14:05', end: '14:25' })
    expect(table[2]).toMatchObject({ start: '14:25', end: '15:05' })
  })

  it('원본 배열은 건드리지 않는다', () => {
    const copy = structuredClone(sessions)
    buildTimetable('14:00', sessions)
    expect(sessions).toEqual(copy)
  })
})

describe('totalMinutes', () => {
  it('모든 세션 시간을 더한다', () => {
    expect(totalMinutes(sessions)).toBe(65)
  })
})
