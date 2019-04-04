import React from 'react';
import ReactDOM from 'react-dom';
import SplashScreen from '../Screens/SplashScreen';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
shallow(<SplashScreen />);
});

it('accepts isSignedIn prop', () => {
    shallow(<SplashScreen isSignedIn={true}/>);
});