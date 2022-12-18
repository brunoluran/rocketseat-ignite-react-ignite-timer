import { useContext } from 'react'
import { CountdownContainer } from './styled'

import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const { minutes, seconds } = useContext(CyclesContext)

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <div className="separator">:</div>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
