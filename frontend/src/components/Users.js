// import React, {Fragment} from 'react';
import React, {Fragment, useState, useEffect} from 'react';
const API = process.env.REACT_APP_API;

export const Users = () => {
    // this define the State with Hooks
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [users, setUsers] = useState([]) 
    // needed to update the list 
    const [editing, setEditing] = useState(false) 
    const [id, setId] = useState('') 

    const [postId, setPostId] = useState('')   // delete this line

    // get all Users from db onMount  
    useEffect( () => { 
      fetch(`${API}/users`).then(
        res => res.json()).then(
        data => setUsers(data))
    }  , []);   // onMount
    // }         );   // inifite loop!!! 
    // }, [users]);   // inifite requests 

    // refresh Users function
    const getUsers = async () => {
      setUsers( await fetch(`${API}/users`).then( 
        res => res.json()))  
    }  

    // Create a new User on db, based on form values 
    // or update an existing one
    const handleSubmit = async (e) => {
      console.log('url api for create/update:' + API + '/users')
      console.log('editing value: ', editing)
      
      // without the page will refesh
      e.preventDefault()

      // check if user already exists by email
      if (!editing){
        const listOfEmails = await fetch(`${API}/users`).then( 
          res => res.json()
          ).then( arr => arr.map( obj => {return obj.email} )
        )

        // if User not present in the db  
        if (listOfEmails.indexOf(email) === -1)  
          { // create the user
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                'name': name, 
                'email': email, 
                'password': password
              })
            };
            await fetch(`${API}/users`, requestOptions)
            .then( response => response.text() )
            .then( userId => setPostId(userId) );
            console.log(postId) 
          } else { // prompt a message
            console.log("User already in the db!")
          }
      } else {   // update the user's data
        console.log('Before executing the put call!!!')
        await fetch(`${API}/user/${id}`, {
        // await fetch(`${API}/user/<id>`, {   // no error arised!!! 
          method: 'PUT', 
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            'name': name, 
            'email': email, 
            'password': password
          }) } ).then( res => console.log(res))
          console.log('After executing the put call!!!')
        }
        setEditing(false);
        setId('');
        getUsers()
        // clean form 
        setName('')
        setEmail('')
        setPassword('')
    }
  
    // Delete User
    const deleteUser = async (id) => {
      console.log(`url api: ${API}/users/${id}`)

      const userResponse = window.confirm('Are you sure?');
      if (userResponse) { 
        await fetch(`${API}/users/${id}`, {method: 'DELETE'})
            .then( response => response.text() )
            .then( data  => console.log(data));
        // console.log(name, email, password)      
      }
      getUsers()
    }

    // update user data  
    const editUser = async id => {
      const data =  await fetch(`${API}/user/${id}`).then(
        res => res.json());
      setEditing(true);
      setId(id);

      console.log(data)

      setName(data.name)
      setEmail(data.email)
      setPassword(data.password)


      // setEditing(false);
    }


    return(
    // <Fragment>    
    <>
      <h1>Users</h1>

      <div className="row">
        {/* 4 columns zone */}
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
              <div className="form-group card card-body">
                <input 
                  type='text' 
                  onChange={e => setName(e.target.value)} 
                  value={name}
                  className="form-control"
                  placeholder="Name"
                  autoFocus
                />
              </div>
              <div className="form-group card card-body">
                <input 
                  type='email' 
                  onChange={e => setEmail(e.target.value)} 
                  value={email}
                  className="form-control"
                  placeholder="Name"
                />
              </div> 
              <div className="form-group card card-body">
                <input 
                  type='password' 
                  onChange={e => setPassword(e.target.value)} 
                  value={password}
                  className="form-control"
                  placeholder="Password"
                />
              </div>   
              <button className="btn btn-primary btn-block">
                {editing ? 'Update' : 'Create'} 
              </button>
          </form>
        </div>

        {/* 8 columns zone; show all Users */}
        <div className="col-md-8">
          <table>
            <thead>
              <tr> 
                <th>Name of the user</th>
                <th>Email of the user</th>
                <th>Password</th>
                <th>Actions to performe</th>
              </tr>
            </thead>
            
            <tbody>  
              {users.map( (user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td> 
                      <button 
                        className='btn btn-secondary btn-sm btn-block'
                        // onClick={console.log("Update button clicked")}
                        onClick={ e => editUser(user._id)}
                      > 
                        edit </button>
                      <button 
                        className='btn btn-danger btn-sm btn-block'
                        onClick={ e => deleteUser(user._id)}
                      >  
                        Delete </button>
                        <button 
                        className='btn btn-secondary btn-sm btn-block'
                        // onClick={console.log("Update button clicked")}
                      > 
                        Update </button>
                    </td>
                  </tr> )
                ) 
              }
            </tbody>
          </table>
        </div>
{/* 
        Other table       
        <div className="col-md-8">
          <table>
            <thead>
              <tr> 
                <th>Name</th>
                <th>Email</th>
                <th>PW</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>  
              <tr key='0'>
                    <td>A_user.name</td>
                    <td>A_user.email</td>
                    <td>A_user.password</td>
                    <td> A_user.button  </td>
              </tr>

                            <tr key='0'>
                    <td>A_user.name_my name is ...</td>
                    <td>A_user.email my name is ...</td>
                    <td>A_user.password my name is ...</td>
                    <td> A_user.button my name is ... </td>
              </tr> 
            </tbody>
          </table> 
        </div> */}
      </div>

     
      {/* <p> Expected {name}</p> */}

    </>
    // </Fragment>
    )
}