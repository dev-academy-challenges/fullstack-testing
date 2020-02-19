import '@babel/polyfill'
import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from './App'

jest.mock('./api.js', () => ({
  getFruits: () => Promise.resolve([
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

test('renders an <li> for each fruit', async () => {
  const { findAllByTestId } = render(<App />)
  const items = await findAllByTestId('fruit-item')
  expect(items).toHaveLength(3)
})
