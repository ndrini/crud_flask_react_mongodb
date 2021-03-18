# A python flask mongodb web
Python Flask, React Hooks & MongoDB CRUD
19, 032 views Apr 14, 2020

## TODO:

  + CHANGE dockerfile commando to flask run 
  + add docker-compose
  + add swagger

## Git 
URL: git@github.com:ndrini/crud_flask_react_mongodb.git

# execute

## run just backend

With in main folder 

Prepare the image (tags crud:crud)

    /CRUD-Flask-React-MongoDB$ docker build -t crud:crud backend

 
run the image

    /CRUD-Flask-React-MongoDB$  docker run --rm -p 5000:5000 crud:crud

# advantages

With dockerized system we achive: 

  + to isolate MongoDB Server so that it will be accessible only by our API and nothing else (which is an ideal case).

  
 

## Credits

Based on Fazt Code

Fazt Code tutorial 
https://www.youtube.com/watch?v=D1W8H4Rkb9A&pbjreload=101

and

https://medium.com/@ishmeet1995/how-to-create-restful-crud-api-with-python-flask-mongodb-and-docker-8f6ccb73c5bc
