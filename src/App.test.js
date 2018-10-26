import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders containers', () => {
  const wrapper = shallow(<App />);
  // expect(wrapper.contains(welcome)).toBe(true);
  expect(wrapper.find('.app')).toHaveLength(1);
  expect(wrapper.find('.app__container')).toHaveLength(1);
});
