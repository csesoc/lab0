# UNSW CSESoc Lab 0 2020
---

![UNSW CSESoc Logo](site/assets/img/csesocgreyblue.png)
[Original repo](https://github.com/featherbear/UNSW-CompClub2019Summer-CTF)

---
## Installation
A [_requirements.txt_](server/requirements.txt) file is located in the _server_ folder  
`python3 -m pip install -r requirements.txt`

## Run
```bash
cd ~/lab0/server
python3 -m pip install -r requirements.txt
python3 server.py
```

## Run on Server
```bash
cd ~/lab0/server
sudo lsof -t -i tcp:443 -s tcp:listen | sudo xargs kill
sudo nohup python3 server.py &
```

## Configuration File
When the server first runs, a `settings.ini` file will be automatically created from the `settings.example.ini` skeleton.

```ini
[SERVER]
port = 443               # Port to listen on
database = data.sqlite3 # SQLite database file 

[SITE]
templatesDir = ../site  # Jinja template base path
staticDir = ../site     # Static file base path

[ADMIN]
username = admin        # Superuser username
password = password     # Superuser password
```

---
## Credits

This project was originally created by Andrew Wong for the CSESoc Compclub 2019 Summer CTF.

It has been modified by Michael Gribben for CSESoc's [Lab 0](https://lab0.tech/invite/).

---
## License
This software is licensed under the MIT License.  
You are free to redistribute it and/or modify it under the terms of the license.  
