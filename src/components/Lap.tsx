import { formattedSeconds } from '../utils/helpers';

export interface LapProps {
  index: number;
  lap: number;
  onDelete: () => void;
}

export default function Lap({ index, lap, onDelete }: LapProps) {
  return (
    // Repeated components require a unique key
    <div key={`unique-lap-key-${index}`} className='stopwatch-lap'>
      <strong>{index}</strong>/ {formattedSeconds(lap)}{' '}
      <button onClick={onDelete}> X </button>
    </div>
  );
}
