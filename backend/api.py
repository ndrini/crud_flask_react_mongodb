from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

import os
from flask import render_template, send_from_directory

app = Flask(__name__)
# not existing yet database
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)  # connection variable 

CORS(app)

db = mongo.db.users  # first call the mongodb collection will be created

# app.add_url_rule('/favicon.ico',
#                  redirect_to=url_for('static', filename='favicon.ico'))

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                          'favicon.ico',mimetype='image/vnd.microsoft.icon')


@app.route('/')
def index():
    ''' html template page '''
    return render_template('index.html')

@app.route('/users', methods=['POST'])
def createUser():
    ''' create a new single user, based on request data'''
    print(request.json)
    # db.add_user('newTestUser', 'Test123', roles=[{'role':'readWrite','db':'testdb'}])
    id = db.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'password': request.json['password'],
        })   
    print('ObjectId(id): ', str(ObjectId(id)))    
    return str(ObjectId(id))  #jesonify not needed
 
@app.route('/users', methods=['GET'])
def getUsers():
    ''' return the data of ALL the users '''
    # users = db.find() 
    # # list_collection_names()
    # names = [i['name'] for i in users]
    # print(users)
    # print(names)
    # return 'All users listed'
    users = []
    for doc in db.find(): 
        users.append({
            '_id': str(ObjectId(doc['_id'])), 
            'name': doc['name'],
            'email': doc['email'],
            'password': doc['password'], 
            })
    return jsonify(users)

@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    ''' return the data of a single user '''
    print(id)
    user = db.find_one({"_id" : ObjectId(id)})
    print(user)
    # return user['name']
    # return 'received'
    return {
            '_id': str(ObjectId(user['_id'])), 
            'name': user['name'],
            'email': user['email'],
            'password': user['password'], 
            }

@app.route('/users/<id>', methods=['DELETE'])
def deteteUser(id):
    ''' delete user by id'''
    try: 
        result = db.delete_one({'_id': ObjectId(id)})
        return f'Deleted {str(ObjectId(id))}'
    except: 
        return 'Error: provide a valid id!'

@app.route('/user/<id>', methods=['PUT'])
def updateUser(id):
    # user = db.find_one({"_id" : ObjectId(id)})
    # TODO allow single field update
    try:
        result = db.update_one(
            {"_id" : ObjectId(id)},
            {"$set": {
                'name': request.json['name'],
                'email': request.json['email'],
                'password': request.json['password'], 
                }
            }
            #, upsert=True
            )
        # print(user)
        return  f'Updated {str(ObjectId(id))}' 
    except: 
        return 'Error: provide a valid id!'


# book 10Possibilities
@app.route('/book/<id>', methods=['GET'])
def getPage(id):
    ''' return the data of a page '''
    # print(id)
    # user = db.find_one({"_id" : ObjectId(id)})
    # print(user)
    # return user['name']
    # return 'received'
    return {
            # page url 
            # 'image': str(ObjectId(user['_id'])), 
            'name': "Angel",
            # 'email': user['email'],
            # 'password': user['password'], 
            }





if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
