# This is Apach web site ver 2.0

# how to start


## 1. build documentation
### Environment Setting

> ```virtualenv -p python3 venv```

### Activate the virtual environment

> ```source venv/bin/activate```

### Install the python requirements

> ```pip install -r requirements.txt```

### build

> ```sphinx-multiversion docs static/age-manual/```


## 2. gatsby website develop mode

### require node v16.16.0

> ```
> yarn install or npm install
> yarn run start or npm run start
> 
> or 
> 
> yarn run serve or npm run serve
> ```

### web site : visit please http://localhost:8000/

### admin(Content Management System) : http://localhost:8000/admin


## 3. build & deploy

> ```
> yarn run deploy or npm run deploy
> ```
