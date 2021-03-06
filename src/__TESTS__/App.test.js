import React from 'react';
import App from '../App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SignInScreen from '../Screens/SignInScreen';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  shallow(<App />);
});


it('returns <SignInScreen /> if not signed in', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(SignInScreen));
})
