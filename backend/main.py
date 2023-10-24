from flask import Flask, render_template
from flask_socketio import SocketIO, emit, send
from flask_cors import CORS
import asyncio

from phyengine import *

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins="http://localhost:5173")

CORS(app)


@socketio.on('message')
def handle_message(data):
    print('received message: ' + data)


@socketio.on('json')
def handle_json(json):
    print('received json: ' + str(json))


@socketio.on('simulation_run')
def handle_run_simulation(data):
    print('received simulation_run: ' + str(data))
    socketio.emit('simulation_start')
    socketio.sleep(0)
    runSimulation(data)


def runSimulation(ic):
    print("start")

    win = SimulationWindow(800, 800)
    simulation = Simulation(win)
    simulation.add_socket(socketio)

    for o in ic["objects"]:
        # in the final version this will be abudnant; structure of the obj here will be the same as the strucutre of the object passed from react
        obj = Object(ID=o["id"], positions=o["positions"], init_v=Vector(
            ic['initVel_X'], ic['initVel_Y']), mass=1, density=1)
        simulation.add_object(obj)

    simulation.run(ic['duration'], ic['timestep'])

    print("end")


if __name__ == '__main__':
    socketio.run(app, port=5005)
