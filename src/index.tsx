//Move the main stopwatch app to a component and render within an index.tsx file, enclosed within a strictmode component

import React from 'react';
import ReactDOM from 'react-dom';
import Stopwatch from './components/StopWatch';

ReactDOM.render(
  <React.StrictMode>
    <Stopwatch initialSeconds={0} />
  </React.StrictMode>,
  document.getElementById('content')
);
