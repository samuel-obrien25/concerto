import React from 'react';
import ActionMenu from '../Components/Menu/ActionMenu';
import Fab from '../Components/Buttons/Fab';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

it('renders without crashing', () => {
   shallow(<ActionMenu />);
});

it('Changes state to isExpanded when Fab is clicked', () => {
    const wrap = shallow(<ActionMenu/>);
    console.log(wrap.find(<Fab fabType='open'/>).dive().props());
    console.log(wrap.find(<Fab fabType="open"/>).simulate('click'));
})