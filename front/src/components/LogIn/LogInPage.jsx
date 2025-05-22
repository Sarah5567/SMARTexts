import React from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/userSlice.jsx'
import {useNavigate} from "react-router-dom";


export default function Main() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const nevigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/auth/login',
                {
                    email: data.email,
                    password: data.password
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(res.data.name)
            dispatch(setUser({
                name: res.data.name,
                email: res.data.email,
            }))
            console.log('connected')
            nevigate('/AllDocuments')
        }
        catch(err){
            console.log('something went wrong: ' + err.message)
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center" style={{}}>
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            {...register("email", { required: "Email is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1" htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}
