import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {AllDataType} from "./index";


let allDataTest: AllDataType = {
  dialogs: [
    {id: 1, name: "Alexandr"},
  ],
  messages: [
    {id: 1, message: "Helloooo!!!"},
  ],
  posts: [
    {id: 1, message: "Hello, it's a post 1", likeCount: 7},
  ]
}
test('renders learn react link', () => {
  render(<App data={allDataTest}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
