import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {useDispatch} from "react-redux";
import {setUser} from "../../store/userSlice.jsx";
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const nevigate = useNavigate()
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        try {
            const res = await axios.post('http://localhost:8080/auth/register',
                {
                    name: data.name,
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
            console.log('connected')
            dispatch(setUser({
                name: res.data.name,
                email: res.data.email,
            }))
            nevigate('/AllDocuments')
        }
        catch(err){
            console.log('something went wrong: ' + err.message)
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>

                    <div>
                        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">Name</label>
                        <input
                            id="name"
                            type="text"
                            autoComplete="name"
                            aria-invalid={errors.name ? "true" : "false"}
                            {...register("name", {
                                required: "Name is required",
                                minLength: {
                                    value: 2,
                                    message: "Name must be at least 2 characters"
                                }
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            aria-invalid={errors.email ? "true" : "false"}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
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
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}
