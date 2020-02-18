import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from './App'

// Prevent <App> from calling the API
App.prototype.componentDidMount = () => {}

jest.mock('./api.js', () => ({
  getFruits: () => ([
    {
      id: 1,
      name: 'orange'
    }, {
      id: 2,
      name: 'persimmons'
    }, {
      id: 3,
      name: 'kiwi fruit'
    }
  ])
}))

test('test runner is working', () => {
  expect(true).toBeTruthy()
})

test('page header includes fruit', () => {
  const { getByTestId } = render(<App />)
  const h1 = getByTestId('header')
  expect(h1).toHaveTextContent('Fruit FTW!')
})

xtest('renders an <li> for each fruit', () => {
  const { getAllByRole } = render(<App />)
  const liList = getAllByRole('li')
  expect(liList).toHaveLength(3)
})
