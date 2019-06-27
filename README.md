# UNSW CompClub 2019 Summer CTF Server
---

![UNSW CSE CompClub Logo](site/assets/img/compclub.logo.svg)
A CTF frontend designed for UNSW's [CSE CompClub 2019 Summer](//summer2019.compclub.com.au) Security Workshop  
[Demo](//featherbear.github.io/UNSW-CompClub2019Summer-CTF)

---
## Installation
A [_requirements.txt_](server/requirements.txt) file is located in the _server_ folder  
`pip install -r requirements.txt`

## Run
```bash
cd server
python server.py
```

## Configuration File
When the server first runs, a `settings.ini` file will be automatically created from the `settings.example.ini` skeleton.

```ini
[SERVER]
port = 8000              # Port to listen on
database = data.sqlite3  # SQLite database file 

[SITE]
templatesDir = ../site  # Jinja template base path
staticDir = ../site     # Static file base path

[ADMIN]
username = admin        # Superuser username
password = password     # Superuser password
```

## Admin users
There is no user account management interface (_yet_).  
Edit the SQLite entry for the user in the `users` table.  

## Customisation

* To modify the invite page background, replace `site/invite/background.jpg`  
* For most other page modifications, edit `site/template.html`

---

## Credits

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
Copyright © 2018 - 2019 Andrew Wong  

This software is licensed under the MIT License.  
You are free to redistribute it and/or modify it under the terms of the license.  

For more details see the _LICENSE_ file
