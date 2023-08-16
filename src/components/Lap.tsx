import { formattedSeconds } from '../utils/helpers';
import { ILap } from './StopWatch';

export interface LapProps {
  lap: ILap;
  onDelete: () => void;
}

export default function Lap({ lap, onDelete }: LapProps) {
  return (
    <div className='stopwatch-lap'>
      <strong>{lap.id}</strong> / {formattedSeconds(lap.seconds)}:{lap.mili}{' '}
      <button onClick={onDelete}> X </button>
    </div>
  );
}
