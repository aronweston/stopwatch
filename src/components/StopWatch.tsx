import { Component, ClassAttributes } from 'react';
import { formattedSeconds } from '../utils/helpers';
import Lap from './Lap';

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

interface StopwatchState {
  lastClearedIncrementer: null | (() => any);
  secondsElapsed: StopwatchProps['initialSeconds'];
  laps: number[] | [];
}

export default class Stopwatch extends Component<
  StopwatchProps,
  StopwatchState
> {
  public incrementer: any;

  state: StopwatchState = {
    secondsElapsed: 0,
    lastClearedIncrementer: null,
    laps: [],
  };

  constructor(props: StopwatchProps) {
    super(props);
    this.state.secondsElapsed = props.initialSeconds;

    //All functions require to be bound to "this"
    this.handleStopClick = this.handleStopClick.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
    this.handleLapClick = this.handleLapClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
  }

  private handleStartClick() {
    this.incrementer = setInterval(
      () =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1,
        }),
      1000
    );
  }

  private handleStopClick() {
    clearInterval(this.incrementer);
    this.setState({ lastClearedIncrementer: this.incrementer });
  }

  private handleResetClick() {
    clearInterval(this.incrementer);

    this.setState({
      laps: [],
      secondsElapsed: 0,
    });
  }

  //Change function naming to 'handleLapClick'
  private handleLapClick() {
    const laps = [...this.state.laps, this.state.secondsElapsed];
    this.setState({ laps });
    this.forceUpdate();
  }

  private handleDeleteClick(index: number) {
    this.setState({ laps: this.state.laps.splice(index, 1) });
  }

  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state;

    return (
      <div className='stopwatch'>
        <h1 className='stopwatch-timer'>{formattedSeconds(secondsElapsed)}</h1>
        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type='button'
            className='start-btn'
            onClick={this.handleStartClick}
          >
            start
          </button>
        ) : (
          <button
            type='button'
            className='stop-btn'
            onClick={this.handleStopClick}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          <button type='button' onClick={this.handleLapClick}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          <button type='button' onClick={this.handleResetClick}>
            reset
          </button>
        ) : null}
        <div className='stopwatch-laps'>
          {this.state.laps &&
            this.state.laps.map((lap, i) => (
              // Repeated components require a unique key
              <Lap
                key={`unique-lap-key-${i}`}
                index={i + 1}
                lap={lap}
                onDelete={() => this.handleDeleteClick(i + 1)}
              />
            ))}
        </div>
      </div>
    );
  }
}
