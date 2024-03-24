import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Sprint 7 Challenge Learner Tests', () => {

  describe('Testing sum function', () => {
    test('[1] sum() throws an error "pass valid numbers"', () => {
      expect(() => sum()).toThrow('pass valid numbers');
    })
    test('[2] sum(2, "seven") throws an error "pass valid numbers"', () => {
      expect(() => sum(2, 'seven')).toThrow('pass valid numbers');
    })
    test('[3] sum(1, 3) returns 4', () => {
      expect(sum(1, 3)).toBe(4);
    })
    test('[4] sum("1", 2) returns 3', () => {
      expect(sum('1', 2)).toBe(3);
    })
    test('[5] sum("10", "3") returns 13', () => {
      expect(sum('10', '3')).toBe(13);
    })
  })

  describe('Integration Testing of HelloWorld component', () => {
    test('[1] renders a link that reads "Home"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('Home')).toBeInTheDocument();
    })
    test('[2] renders a link that reads "About"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('About')).toBeInTheDocument();
    })
    test('[3] renders a link that reads "Blog"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('Blog')).toBeInTheDocument();
    })
    test('[4] renders a link that reads "The Truth"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('The Truth')).toBeInTheDocument();
    })
    test('[5] renders a link that reads "JavaScript is pretty awesome"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('JavaScript is pretty awesome')).toBeInTheDocument();
    })
    test('[6] renders a link that reads "javascript is pretty"', () => {
      render(<HelloWorld />);
      expect(screen.queryByText('javascript is pretty', { exact: false })).toBeInTheDocument();
    })
  })

})

function sum(a, b) {
  a = Number(a)
  b = Number(b)
  if (isNaN(a) || isNaN(b)) {
    throw new Error('pass valid numbers')
  }
  return a + b
}

function HelloWorld() {
  return (
    <div>
      <h1>Hello World Component</h1>
      <nav>
        <a href='#'>Home</a>
        <a href='#'>About</a>
        <a href='#'>Blog</a>
      </nav>
      <main>
        <section>
          <h2>The Truth</h2>
          <p>JavaScript is pretty awesome</p>
        </section>
      </main>
    </div>
  )
}
