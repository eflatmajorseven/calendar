import UserDelete from './UserDelete'
import React from 'react';
import ReactDOM from 'react-dom';
import {render, screen, cleanup} from '@testing-library/react'


describe ("Users manager page",  () => {
    it ("should render a table of users", ()=> {
    render(<UserDelete />);
    const someElement = screen.getByTestId('employee');
    expect(someElement).toBeInTheDocument();
    })
}
)