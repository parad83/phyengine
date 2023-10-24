import math
import json


class Vector:
    def __init__(self, x, y):
        self.x: int = x
        self.y: int = y

    def to_dict(self):
        return {"x": self.x, "y": self.y}

    def magnitude(self):
        return math.sqrt(self.x**2+self.y**2)

    def __str__(self):
        return f"('x': {self.x}, 'y': {self.y})"


class VectorArray():
    def __init__(self):
        self.iter_index = 0
        self.vector_list = []

    def append(self, vector):
        if isinstance(vector, Vector):
            self.vector_list.append(vector)
        else:
            raise ValueError()

    def index(self, index):
        if index >= 0 and index <= len(self.vector_list):
            return self.vector_list[index]
        else:
            raise IndexError()

    def to_dict(self):
        return [vector.to_dict() for vector in self.vector_list]

    def __iter__(self):
        return self

    def __next__(self):
        if self.iter_index < len(self.vector_list):
            result: Vector = self.vector_list[self.iter_index]
            self.iter_index += 1
            return result
        raise StopIteration

    def hasNext(self):
        return self.iter_index < len(self.vector_list)

    def getNext(self):
        try:
            return next(self)
        except StopIteration:
            pass

    def __len__(self):
        return len(self.vector_list)

    @classmethod
    def create(self, array):
        vectorArray = VectorArray()
        for el in array:
            vectorArray.append(Vector(el["x"], el["y"]))
        return vectorArray


class VectorEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Vector):
            return {"x": obj.x, "y": obj.y}
        return super().default(obj)
