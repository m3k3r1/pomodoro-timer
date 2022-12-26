import { formatDistanceToNow } from 'date-fns'
import { useContext } from 'react'
import { CountdownContext } from '../../contexts/CountdownContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { countdowns } = useContext(CountdownContext)

  return (
    <HistoryContainer>
      <h1>My history</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Begining</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {countdowns.map((countdown) => {
              return (
                <tr key={countdown.id}>
                  <td>{countdown.task}</td>
                  <td>{countdown.minutesAmount} minutes</td>
                  <td>
                    {formatDistanceToNow(new Date(countdown.startDate), {
                      addSuffix: true,
                    })}
                  </td>
                  <td>
                    {countdown.finishedDate && (
                      <Status statusColor="green">Finished</Status>
                    )}
                    {countdown.stopDate && (
                      <Status statusColor="red">Stopped</Status>
                    )}
                    {!countdown.finishedDate && !countdown.stopDate && (
                      <Status statusColor="yellow">Running</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
