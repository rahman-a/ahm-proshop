import bcrypt from 'bcrypt'

const users = [
    {
        name:'Ahmed Abdelrahman',
        email:'ahm@test.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin:true
    },
    {
        name:'Osama Ibrahim',
        email:'osama@test.com',
        password: bcrypt.hashSync('78965', 10),
    },
    {
        name:'Galal Mahmoud',
        email:'galal@test.com',
        password: bcrypt.hashSync('45632', 10),
    },
]

export default users





