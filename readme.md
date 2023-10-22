Phyengine by me :)
===

*branch prototype includes a working prototype lol*

### Objectives
1. Differential equation solver using Euler method or Runge-Kutta method as the engine.
2. A web GUI which shows the objects as time progresses.
3. Initial conditions setter in the GUI. 


To evaluate any probems and have a prototype the app will be developed in Python first. The program will be redone in C++ once its finished in Python.

---

### GUI
The GUI will be done in React with Typescript, such that it can be connected to any backend, no matter the language.

HTML's canvas will be used to easily draw any shapes. Additioanlly, to create the function of clicking each object, div element will be created on top of the canvas, mathing the postion of the drawn objects. 

---

### Objects
Each object is defined with:
- type (shape)
  - circle
    * radius
  - pin point 
  - polygon
    * number of sides; 
    * regular/irregular
    * lenght of (the) side(s)
  - other -> imported from a sketch for example
- mass
- centre of mass -> x-, y-cooridnates of the point
- initial position -> x-, y-cooridnates of the point

Frontend
---
#### Approach #1
Use vanilla html to render objects as divs in the `SimulationWindow` component with `useState` list. When the div is clicked, `ObjectMenu` is shown. The draw function will be held in the `SimulatioWindow` component. 

#### Approach #2
Use html canvas to draw objects in the `SimulationWindow` component. Compare the x-, y-coordinates with the object's boundaries in the `Object` component, and show the `ObjectMenu`.

#### Approach #3
Render divs in `SimulatioWindow` on top of the objects drawn in canvas, positioned at the same coordinates as the object, which when clicked, will show their `ObjectMenu`. Objects will be based on the component `Object`, which will be used in individual shape components (ex. `Rectangle`, `Line`) with their coresponding draw functions. 
