from flask import Flask
import redis
import os

app = Flask(__name__)
redis_host = os.getenv('REDIS_HOST', 'redis')
redis_client = redis.Redis(host=redis_host, port=6379, db=0)

@app.route('/')
def index():
    redis_client.lpush('tasks', 'Task from web service')
    return 'Task sent to Redis queue!'
