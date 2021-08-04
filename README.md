# UNSW CSESoc Lab 0 2020
---

![UNSW CSESoc Logo](site/assets/img/csesocgreyblue.png)
[Original repo](https://github.com/featherbear/UNSW-CompClub2019Summer-CTF)

---
## Features
The admin can create/edit categories. All questions and submissions must be associated with a category.

The admin can create/edit questions. Users can submit an answer for a question. There can only be one correct answer for a question. It is not case sensitive.

Solved questions appear green to users. They also receive points for each question they solve.

The admin can view a user's username, points and solves. They can also delete a user.

Users can be viewed sorted by:
- Username (Descending)
- Username (Ascending)
- Points (Descending)
- Points (Ascending)
- Solves (Descending)
- Solves (Ascending)

## Installation
A [_requirements.txt_](server/requirements.txt) file is located in the _server_ folder  
`python3 -m pip install -r requirements.txt`

## 

Environment variables:
- admin_username
- admin_password
- secret_cookie

## Run
```bash
cd ~/lab0/server
python3 -m pip install -r requirements.txt
python3 server.py
```

## HTTP v HTTPS
The following assumes the server will run over HTTPS. Change ```lab0.tech``` to the appropriate domain. It also assumes that you have installed a HTTPS certificate at the following location:
```
/etc/letsencrypt/live/lab0.tech/fullchain.pem
/etc/letsencrypt/live/lab0.tech/privkey.pem
```

If this is not the case, the server will instead try to run over HTTP.

To get HTTPS certificates, type the following on the server:
```bash
sudo apt-get update
sudo apt-get install software-properties-common
sudo add-apt-repository universe
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
sudo certbot certonly --standalone
```

To autorenew, add the following into crontab:
```bash
0 0 1 * * sudo apt-get update && sudo apt-get upgrade && sudo apt autoremove
0 0 1 * * sudo certbot renew
```

## Run on Server
```bash
cd ~/scavhunt/server
sudo apt-get update && sudo apt-get upgrade && sudo apt autoremove
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

### Server (Python)
[`Jinja2`](http://jinja.pocoo.org) - _Version 2.10.1_  
[`tornado`](//www.tornadoweb.org) - _Version 5.1.1_

### Website
[`bulma.css`](//bulma.io) - _Version 0.7.2_  
[`Bulma-extensions`](//wikiki.github.io)  
[`normalize.css`](//necolas.github.io/normalize.css) - _Version 8.0.1_  
[`three.js`](//threejs.org) - _Version 98_  

[`Font Awesome`](//fontawesome.com)  
[`Hack`](//sourcefoundry.org/hack) - _Version 3.3.0_  

### Snippets / Resources
[`glitch - sketch of three.js`](//ykob.github.io/sketch-threejs/sketch/glitch.html) by yoichi kobayashi  
[`Jinja2 Rendering stub for Tornado`](https://bibhasdn.com/blog/using-jinja2-as-the-template-engine-for-tornado-web-framework/) by Bibhas Debnath  
[Dotted World Map](//www.deviantart.com/snowfleikun/art/Dots-world-map-179891314) by sNowFleikuN  
[CSS Scanlines](//codepen.io/meduzen/pen/zxbwRV) by meduzen  

---
## License
This software is licensed under the MIT License.  
You are free to redistribute it and/or modify it under the terms of the license.  
