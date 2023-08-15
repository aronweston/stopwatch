import { formattedSeconds } from '../utils/helpers';

export interface LapProps {
  index: number;
  lap: number;
  onDelete: () => void;
}

/* 
Notes:
- Delete function does not delete invidiual lap but all of the laps
*/

export default function Lap({ index, lap, onDelete }: LapProps) {
  return (
    <div className='stopwatch-lap'>
      <strong>{index}</strong>/ {formattedSeconds(lap)}{' '}
      <button onClick={onDelete}> X </button>
    </div>
  );
}
