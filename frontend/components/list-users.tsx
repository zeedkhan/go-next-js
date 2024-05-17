"use client";

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";


interface AddUser {
    name: string;
    email: string;
}

const isDevelopment = process.env.NODE_ENV === 'development';


const ListUsers = () => {
    const apiUrl = !isDevelopment ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:8000';

    const [users, setUsers] = useState<User[]>([]);
    const [user, setUser] = useState<AddUser>({
        name: '',
        email: '',
    });


    useEffect(() => {
        const getUsers = async () => {
            try {
                const req = await axios.get<User[]>(`${apiUrl}/api/go/users`);
                const { data } = req;
                setUsers(data);
            } catch (e) {
                console.error(e);
                return {};
            }
        };

        getUsers();
    }, []);

    const addUser = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const req = await axios.post(`${apiUrl}/api/go/users`, user);
            const { data } = req;
            setUsers([...users, data]);
        } catch (e) {
            console.error(e);
            return {};
        }
    }

    return (
        <div>
            <form onSubmit={addUser} className="border shadow-xl rounded-xl pt-2 flex flex-col justify-around space-y-4">
                <div className="space-y-4 flex flex-col px-2">
                    <label htmlFor="name">Name</label>
                    <input
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="border rounded py-2"
                        type="name"
                        name="name"
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="border rounded py-2"
                        type="email"
                        name="email"
                    />
                </div>

                <div className="w-full h-14 max-w-[80%] mx-auto pb-4">
                    <button type="submit" className="w-full bg-green-200 h-full rounded-xl">
                        Add
                    </button>
                </div>
            </form>

            <ul className="py-4 border shadow-xl rounded-xl mt-4 px-4">
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListUsers;