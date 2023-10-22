import asyncio
import websockets


'''
flask-socketio

set initial conditions in react --> python running the simulation for t+dt --> react rendering the object in a new position
initial conditions --> get initial conditions, run the simulation, send new position --> get new position
'''

async def data_server(websocket, path):
    while True:
        data = "Your real-time data"
        await websocket.send(data)
        await asyncio.sleep(1)

start_server = websockets.serve(data_server, "localhost", 8765)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

