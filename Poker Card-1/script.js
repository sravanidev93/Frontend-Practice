let Users=[
    {
        id:1,
        name:'Sravani',
        email:'sravani@gmail.com',
        address:'Madanapalle',


    },
    {
        id:2,
        name:'Nandhini',
        email:'nandhu@gmail.com',
        address:'Nellore'

    },{
        id:3,
        name:'Pavan Kumar',
        email:'pavanca@gmail.com',
        address:'MPL'

    },{
        id:4,
        name:'Neha',
        email:'neha@gmail.com',
        address:'Kakinada'

    },{
        id:5,
        name:'Sweety',
        email:'sweety@gmail.com',
        address:'Rayachoti'

    },{
        id:6,
        name:'Charvi',
        email:'charvi@gmail.com',
        address:'Kadiri'

    },{
        id:7,
        name:'Arjun',
        email:'arjun@gmail.com',
        address:'Tirupathi'

    },
    {
        id:8,
        name:"John",
        email:'john@gmail.com',
        address:'Bangalore'
    }
]

const newUser={
    id:Users.length+1,
    name:'Anasuya',
    email:'anu@gmail.com',
    address:'Vayalpad'
}

const addUser=()=>{
    Users=[{...Users,...newUser}];
    console.log("Users data after adding a new user",Users)
}
addUser();

const updateUser=()=>{
    if(Users){
        Users[0]={...Users[0],email:"sravaniderangula777@gmail.com"};

    }
    console.log("Users data after updating users details",Users);
}
updateUser();

const deleteUser = (id) => {
    Users = Users.filter(user => user.id !== id); // Keeps all users except the one with the given id
    console.log("Users data after deleting a user:", Users);
};

deleteUser(1); // Deletes user with id=1
  
