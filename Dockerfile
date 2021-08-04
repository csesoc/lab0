# syntax=docker/dockerfile:1
FROM nouchka/sqlite3:latest
FROM python:3.8-slim
WORKDIR /lab0
COPY . .
RUN cd server && python3 -m pip install -r ./requirements.txt
CMD cd server && python3 ./server.py
