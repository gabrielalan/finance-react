import { MemoryRouter } from 'react-router';
import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

const setup = (assertions) => () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><Header /></MemoryRouter>, div);
  assertions(div);
  ReactDOM.unmountComponentAtNode(div);
};

it('renders without crashing', setup((div) => {
  const title = div.querySelector('.navbar-brand');
  expect(title).toBeTruthy();
}));
