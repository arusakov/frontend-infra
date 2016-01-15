import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Component from './Component';

export function main() {
  ReactDOM.render(
    React.createElement(Component),
    document.getElementById('root')
  );

  console.log('Hello, world!');
 }

if (process.env.NODE_ENV !== 'test') {
  main();
}
