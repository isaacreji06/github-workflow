import redis
import time
import os

redis_host = os.getenv('REDIS_HOST', 'redis')
redis_client = redis.Redis(host=redis_host, port=6379, db=0)

print("Worker started. Waiting for tasks...")

while True:
    task = redis_client.brpop('tasks')
    print("Processed:", task[1].decode())
    time.sleep(1)