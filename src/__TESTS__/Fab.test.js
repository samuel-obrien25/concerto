import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Fab from '../Components/Buttons/Fab';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
    shallow(<Fab />);
});