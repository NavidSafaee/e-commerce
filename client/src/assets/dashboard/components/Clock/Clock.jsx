import { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css'

export default function AnalogClock() {
  const [value, setValue] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000)

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div>
      <Clock value={value} size={240} secondHandWidth={3} renderNumbers={true} className={"clockCircle"}/>
    </div>
  )
}