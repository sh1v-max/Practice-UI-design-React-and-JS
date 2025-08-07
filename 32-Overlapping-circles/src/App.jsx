import React from 'react'
import { Hello } from './Components/Hello'
import OverlappingCircle from './Components/OverlappingCircle'

export const App = () => {
  return (
    <div className='app'>
      <header className='app-header'>
        <h1 className='app-title'>Interactive Circles</h1>
        <p className='app-description'>
          Click anywhere on the screen to create circles. When circles overlap, they change colors!
        </p>
      </header>
      
      <main className='app-main'>
        {/* <Hello/> */}
        <OverlappingCircle/>
      </main>
    </div>
  )
}

// task:
// click to draw circle, 
// when clicking again the new overlapping circle must 
// have different color

// visualize the formula to see how the distance between radii works

// how to do it?
// create a circle component
// create a overlapping circle component
// there's no circle(the shape) in web naturally, it's always a square or rect

// ideally we do:
// SQUARE1.RIGHT < SQUARE2.LEFT -> OVERLAP
// SQUARE1.LEFT > SQUARE2.RIGHT -> OVERLAP
// SQUARE1.TOP < SQUARE2.BOTTOM -> OVERLAP
// SQUARE1.BOTTOM > SQUARE2.TOP -> OVERLAP

// problem with this method? 
// as it uses square, it doesn't work for exact circle, it also considers the distance between the centers and the square

// for reference, watch this
// https://youtu.be/SbAUz8wm8_0?list=PLQOMi2yb4hF2F4G_pA8fHSupjDG92CuU7&t=370

// to counter that, we will use the distance formula between radius of two circles in 2D plane
// formula is: 
// sqrt((x1-x2)^2 + (y1-y2)^2)

// use clientX and clientY to get the position of the mouse
// give position: absolute because by default all are static, make 'em dynamic
// circle will form at the tip, to fix that, we will use transform: translate(-50%, -50%);
// state for multiple circles