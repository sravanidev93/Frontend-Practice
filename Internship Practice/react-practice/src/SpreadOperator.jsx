import { useState, useEffect } from "react";
export default function UsersData() {
 const [users, setUsers] = useState([
        {
            id: 1,
            name: 'Sravani',
            email: 'sravani@gmail.com',
            address: 'Madanapalle',
        },
        {
            id: 2,
            name: 'Ishitha',
            email: 'ishitha@gmail.com',
            address: 'Delhi'
        }, {
            id: 3,
            name: 'Rahul',
            email: 'rahul@gmail.com',
            address: 'Chennai'
        }, {
            id: 4,
            name: 'Meera',
            email: 'meera@gmail.com',
            address: 'Kolkata'
        }, {
            id: 5,
            name: 'Siddharth',
            email: 'sidh@gmail.com',
            address: 'Vishakapatnam'
        }, {
            id: 6,
            name: 'tanya',
            email: 'tanya@gmail.com',
            address: 'Kadiri'
        }, {
            id: 7,
            name: 'Arjun',
            email: 'arjun@gmail.com',
            address: 'Tirupathi'
        },
        {
            id: 8,
            name: "John",
            email: 'john@gmail.com',
            address: 'Bangalore'
        }
    ]);
    const newUser = {
        id: users.length + 1,
        name: 'Ramya',
        email: 'ramya@gmail.com',
        address: 'Vayalpad'
    }
    useEffect(() => {
        setUsers[[{ ...users, ...newUser }]];
        console.log("Users data after adding a new user", users)
    }, []);
    useEffect(() => {
        if (users) {
            users[0] = { ...users[0], email: "sravaniderangula777@gmail.com" };
            setUsers(...users, users[0])
        }
        console.log("Users data after updating users details", users);
    }, []);
    useEffect(()=>{
        let deleted = users.filter(user => user.id !== users.length);
        setUsers(deleted);
        console.log("Users data after deleting a user:", deleted);
    },[])
    return (
        <div className="grid grid-cols-3 w-1/2 mx-auto my-10  grid-rows-3 gap-4 bg-white">
            {
                users.map((user, ind) => {
                    console.log(user, user.id)
                    return (
                        <div key={user.id} className="flex flex-col p-3 items-center justify-center gap-4 border rounded-lg shadow-lg font-semibold text-lg bg-slate-200">
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <h3>{user.address}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}