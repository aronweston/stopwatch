import { useEffect, useState } from 'react';
import { formattedSeconds } from '../utils/helpers';
import { ILap } from './StopWatch';

export interface LapProps {
  prevLap: ILap | null;
  lap: ILap;
  onDelete: () => void;
}

export default function Lap({ prevLap, lap, onDelete }: LapProps) {
  const [seconds, setSeconds] = useState<string | null>(null);
  const lapSeconds = formattedSeconds(lap.seconds);

  useEffect(() => {
    if (!prevLap) return setSeconds(formattedSeconds(lap.seconds));
    const seconds = lap.seconds - prevLap?.seconds!;
    setSeconds(formattedSeconds(seconds));
  }, [lap, prevLap]);

  return (
    <tr className='stopwatch__lap'>
      <td>{lap.id}</td>
      <td>{seconds}</td>
      <td>
        {lapSeconds}:{lap.mili}{' '}
      </td>
      <td>
        <button className='stopwatch__lap--delete-btn' onClick={onDelete}>
          X
        </button>
      </td>
    </tr>
  );
}
