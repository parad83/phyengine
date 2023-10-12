Phyengine by me :)
===

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

### OBJECTS
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