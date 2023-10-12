import numpy as np
import math
import matplotlib.pyplot as plt

class Object:
    def __init__(self, center_of_mass, init_pos, mass, density):
        '''
        Constructor for Object
        
        Parameters:
        ----------
            center_of_mass :int[] 
                The center of mass of the object given in the format [x, y].
            init_pos: int[]
                The initial position of the object in the format [x, y].
            mass: float 
                The mass of the object.
            density: float
                The density of the object.
        '''
        self.center_of_mass = center_of_mass
        self.init_pos = init_pos
        
    def create_shape(self, sigma=100):
        '''
        Create the outline of the shape given sigma
        
        Parameters:
        ----------
            sigma: int, optional
                The number of points used to define the shape of the object. 
        '''
        pass
            
            
        
        
        
    
class Circle(Object):
    def __init__(self, radius, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.radius = radius
    
    def create_shape(self, sigma=1):
        self.outline_x = np.empty(0)
        self.outline_y = np.empty(0)
        # self.outline_x = np.zeros((int(360*sigma)))
        # self.outline_y = np.zeros((int(360*sigma), 2))
        for a in range(0, int(360/sigma)):
            # x = self.radius*math.cos(a)
            # y = self.radius*math.sin(a)
            self.outline_x = np.append(self.outline_x)
            self.outline_y = np.append(self.outline_y)
            # self.outline[a] = np.array([x, y])
    
    def _x(self):
        return self.center_of_mass[0]-self.radius*math.cos(a)
    
    def _y(self):
        return self.center_of_mass[1]-self.radius*math.sin(a)
        
    def run(self, self_v):
        pass
        

            
        
class PinPoint(Object):
    pass

class Polygon(Object):
    def __init__(self, no_sides, side_length,  *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.no_sides = no_sides
        self.side_length = side_length
        
        

c = Circle(4, [0, 0], [0, 0], 1, 1)

c.create_shape()


# plt.scatter(c.outline[:, 0], c.outline[:, 1])
plt.plot(c.outline_x, c.outline_y)
plt.gca().set_aspect('equal')
plt.show()