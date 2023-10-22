working prototype
================================================================

prototype with a websocket connecting the python physics engine with the react frontend

only basic movement with constant velocity and elastic collisions with the 'walls'

---

- custom vector and vectorarray classes
- basic gui with one object (backend works for more, frontend needs to be 
updated)
- manual time 'slider' (actually a basic input) for controlling the time t 
at which the position of the object is visually shown

---

to be done/added:
1. move websocket connection to app.tsx
2. more objects and shapes
3. collision between objects
4. not constant velocity + acceleration
5. being able to choose inital positions
6. being able to add forces to individual objects
7. being able to control the mass, maybe even density
8. ability to add strings, springs, blocks, boundaries
9. visualisation of forces
10. x-, y-axis 
11. graphs 

---

problems:
* many ws connections
* not being able to pass size to the backend to accurately calcualte any 
collisions (whole lotta work)


