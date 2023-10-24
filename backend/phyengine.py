import json
from vectors import Vector, VectorArray


'''
What information needs to be known about the object:

1) pin point:
    - initial position
    - mass
     
    

'''


class Object:
    obj_count: int = 1

    def __init__(self, ID, positions, init_v, mass, density, center_of_mass=None):
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

                to be finished...
        '''
        self.id: int = ID
        self.positions: VectorArray = VectorArray.create(positions)
        self.init_v: Vector = init_v
        self.mass: float = mass
        self.density: float = density
        self.center_of_mass: Vector = center_of_mass if center_of_mass else positions[0]

        Object.obj_count += 1

    def to_dict(self):
        return {
            "id": self.id,
            "positions": self.positions.to_dict()
        }
        # "init_v": self.init_v.to_dict(),
        # "mass": self.mass,
        # "density": self.density,
        # "center_of_mass": self.center_of_mass.to_dict() if self.center_of_mass else None

    def create_shape(self, sigma=100):
        '''
        Create the outline of the shape given sigma

        Parameters:
        ----------
            sigma: int, optional
                The number of points used to define the shape of the object. 

            to be finished...
        '''
        pass

# class PinPoint(Object):
#     pass


class SimulationWindow():
    def __init__(self, width, height):
        self.width: int = width
        self.height: int = height


class Simulation():
    def __init__(self, window):
        self.window: SimulationWindow = window
        self.objects = []

    def add_object(self, obj):
        self.objects.append(obj)

    # not efficient lol
    def delete_object(self, obj_id):
        for index, o in enumerate(self.objects):
            if o.id == obj_id:
                del self.objects[index]
                break

    def add_socket(self, socket):
        self.socket = socket

    def send_data(self, data):
        self.socket.emit("simulation_end", data)

    def run(self, duration, dt=0.001):
        t: int = 0
        while t <= duration:
            for o in self.objects:
                # get the 'first' element
                prev_pos: Vector = o.positions.getNext()

                new_x = prev_pos.x + o.init_v.x*dt
                new_y = prev_pos.y + o.init_v.y*dt
                # fixed values for size cause too much work lol
                if new_x > self.window.width-10 or new_x < 5:
                    o.init_v.x *= -1
                if new_y > self.window.width-10 or new_y < 5:
                    o.init_v.y *= -1
                o.positions.append(Vector(new_x, new_y))
            t += dt
        self.send_data([object.to_dict() for object in self.objects])


# class Circle(Object):
#     def __init__(self, radius, *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.radius = radius

#     def create_shape(self, sigma=1):
#         self.outline_x = np.empty(0)
#         self.outline_y = np.empty(0)
#         # self.outline_x = np.zeros((int(360*sigma)))
#         # self.outline_y = np.zeros((int(360*sigma), 2))
#         for a in range(0, int(360/sigma)):
#             # x = self.radius*math.cos(a)
#             # y = self.radius*math.sin(a)
#             self.outline_x = np.append(self.outline_x)
#             self.outline_y = np.append(self.outline_y)
#             # self.outline[a] = np.array([x, y])

#     def _x(self):
#         return self.center_of_mass[0]-self.radius*math.cos(a)

#     def _y(self):
#         return self.center_of_mass[1]-self.radius*math.sin(a)

#     def run(self, self_v):
#         pass


# class PinPoint(Object):
#     pass

# class Polygon(Object):
#     def __init__(self, no_sides, side_length,  *args, **kwargs):
#         super().__init__(*args, **kwargs)
#         self.no_sides = no_sides
#         self.side_length = side_length


# c = Circle(4, [0, 0], [0, 0], 1, 1)

# c.create_shape()


# # plt.scatter(c.outline[:, 0], c.outline[:, 1])
# plt.plot(c.outline_x, c.outline_y)
# plt.gca().set_aspect('equal')
# plt.show()
