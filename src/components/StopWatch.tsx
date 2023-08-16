import { Component, ClassAttributes } from 'react';
import { formattedSeconds } from '../utils/helpers';
import Lap from './Lap';

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

export interface ILap {
  id: number;
  seconds: number;
  mili: number;
}

interface StopwatchState {
  lastClearedIncrementer: null | (() => any);
  secondsElapsed: StopwatchProps['initialSeconds'];
  miliSecondsElapsed: StopwatchProps['initialSeconds'];
  laps: ILap[];
  idValue: number;
}

export default class Stopwatch extends Component<
  StopwatchProps,
  StopwatchState
> {
  public secondsIncrementer: any;
  public miliSecondsIncrementer: any;

  //Set state to a public object and assign a type to the variable
  public state: StopwatchState = {
    secondsElapsed: 0,
    miliSecondsElapsed: 0,
    lastClearedIncrementer: null,
    laps: [],
    idValue: 1,
  };

  constructor(props: StopwatchProps) {
    super(props);

    //Assign a props value to state when the component mounts
    this.state.secondsElapsed = props.initialSeconds;

    //All functions require to be bound to "this"
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleLapClick = this.handleLapClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  private handleStartClick() {
    //Setting the state early prevents the 1 second lag that happens on first click of start button
    if (this.state.secondsElapsed === 0) {
      this.setState({ secondsElapsed: this.state.secondsElapsed + 1 });
    }

    this.secondsIncrementer = setInterval(
      () => this.setState({ secondsElapsed: this.state.secondsElapsed + 1 }),
      1000
    );

    this.miliSecondsIncrementer = setInterval(() => {
      if (this.state.miliSecondsElapsed === 59) {
        this.setState({ miliSecondsElapsed: 0 });
      } else {
        this.setState({
          miliSecondsElapsed: this.state.miliSecondsElapsed + 1,
        });
      }
    }, 10);
  }

  private handleStopClick() {
    clearInterval(this.secondsIncrementer);
    clearInterval(this.miliSecondsIncrementer);
    this.setState({ lastClearedIncrementer: this.secondsIncrementer });
  }

  private handleResetClick() {
    clearInterval(this.secondsIncrementer);
    clearInterval(this.miliSecondsIncrementer);
    this.setState({
      laps: [],
      secondsElapsed: 0,
      miliSecondsElapsed: 0,
      idValue: 1,
    });
  }

  //Change function naming to 'handleLapClick'
  private handleLapClick() {
    const { idValue, secondsElapsed, miliSecondsElapsed } = this.state;

    //Create a lap object with a unique id value and the time elapsed
    const lap: ILap = {
      id: idValue,
      seconds: secondsElapsed,
      mili: miliSecondsElapsed,
    };

    //Create a laps array with the new lap above
    const laps: ILap[] = [...this.state.laps, lap];

    //Increment each value to set the new id value to the next lap selected
    //Set the new array of laps to state
    //Remove forceUpdate() due to setState updating the component as state has changed, and removes any unexpected bugs
    this.setState({ laps, idValue: idValue + 1 });
  }

  private handleDeleteClick(lapId: number) {
    //Find the lap in the laps array
    const found = this.state.laps.find(({ id }) => id === lapId);
    if (!found) return;

    //Remove the found lap from the array
    const filteredLaps = this.state.laps.filter((lap) => lap.id !== found.id);

    //Reset the id value counter to 1 when all laps are removed
    const isLastItem = this.state.laps.length === 1;

    //Set the new array to state
    this.setState({
      laps: filteredLaps,
      idValue: isLastItem ? 1 : this.state.idValue,
    });
  }

  render() {
    const { secondsElapsed, miliSecondsElapsed, lastClearedIncrementer, laps } =
      this.state;

    //Assign template conditional rendering statements to clear variable names
    const seconds = formattedSeconds(secondsElapsed);

    const isLastIncrementer =
      this.secondsIncrementer === lastClearedIncrementer;
    const timerHasStarted = secondsElapsed !== 0;
    const isStart = !timerHasStarted || isLastIncrementer;

    //Assign click handlers to variables based on their requirements
    const handleStartAndStopClick = isStart
      ? this.handleStartClick
      : this.handleStopClick;

    const handleLapAndResetClick = !isLastIncrementer
      ? this.handleLapClick
      : this.handleResetClick;

    return (
      <main className='stopwatch'>
        {/* Store calculations in variables before template render for clarity  */}
        <h1 className='stopwatch-timer'>
          {seconds}:{miliSecondsElapsed}
        </h1>

        {/* Prevent button re-render for better accessbility by changing text, class and click handlers only */}
        <button
          type='button'
          className={isStart ? 'start-btn' : 'stop-btn'}
          onClick={handleStartAndStopClick}
        >
          {isStart ? 'Start' : 'Stop'}
        </button>

        {timerHasStarted && (
          <button type='button' onClick={handleLapAndResetClick}>
            {!isLastIncrementer ? 'Lap' : 'Reset'}
          </button>
        )}

        <div className='stopwatch-laps'>
          {/* Remove '&&' check and replace with optional chaining */}
          {laps?.map((lap) => (
            // Repeated components require a unique key to allow react to know what element in a list of elements has been deleted / inserted
            <Lap
              key={`lap-${lap.id}`}
              lap={lap}
              onDelete={() => this.handleDeleteClick(lap.id)}
            />
          ))}
        </div>
      </main>
    );
  }
}
