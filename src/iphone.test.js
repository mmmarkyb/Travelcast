import React from 'react';
import ReactDOM from 'react-dom';
import Iphone from './iphone';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Iphone />, div);
  ReactDOM.unmountComponentAtNode(div);
});
