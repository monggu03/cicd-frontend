// 세션 표를 그리는 컴포넌트입니다.
// 실습 3(대소문자 import)에서 이 파일 이름을 일부러 틀리게 불러 봅니다.
export default function SessionTable({ rows }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>시간</th>
          <th>세션</th>
          <th>발표</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.order}>
            <td className="time">
              {row.start} – {row.end}
            </td>
            <td>
              <strong>{row.title}</strong>
              <span className="minutes">{row.minutes}분</span>
            </td>
            <td>
              {row.speaker}
              <span className={`school school-${row.school}`}>{row.school}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
