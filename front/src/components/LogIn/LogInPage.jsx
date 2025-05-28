import React from "react";
import {useForm} from "react-hook-form";
import axios from 'axios';
import {useDispatch} from 'react-redux'
import {setUser} from '../../store/userSlice.jsx'
import {useNavigate} from "react-router-dom";
import {useAlert} from "../../hooks/useAlert.jsx";
import { LogIn, Mail, Lock, User } from "lucide-react";

export default function Main() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch()
    const nevigate = useNavigate()
    const { showError } = useAlert();

    const onSubmit = async (data) => {
        try {
            console.log('email: ' + data.email)
            console.log('password: ' + data.password)
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
            showError('Login Failed', 'Unable to log in. Please check your credentials.');
        }
    };

    return (
        <div className="w-screen h-screen bg-gradient-to-tl from-indigo-50 via-white to-purple-50 flex items-center justify-center overflow-hidden relative pt-20">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-500 opacity-5"></div>
            <div className="absolute top-40 right-32 w-20 h-20 rounded-full bg-purple-500 opacity-5"></div>
            <div className="absolute bottom-32 left-40 w-16 h-16 rounded-full bg-yellow-500 opacity-5"></div>
            <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-indigo-500 opacity-5"></div>

            {/* Floating geometric shapes */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 opacity-20 transform rotate-45"></div>
            <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-gradient-to-r from-purple-400 to-indigo-400 opacity-20 transform rotate-12"></div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 p-12 w-full max-w-md relative z-10">
                {/* Header with icon */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4 shadow-lg">
                        <LogIn className="h-8 w-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to access your documents</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="email"
                                type="email"
                                autoComplete="email"
                                aria-invalid={errors.email ? "true" : "false"}
                                {...register("email", { required: "Email is required" })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                placeholder="Enter your email"
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                aria-invalid={errors.password ? "true" : "false"}
                                {...register("password", { required: "Password is required" })}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
                                placeholder="Enter your password"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-2 flex items-center">
                                <span className="w-1 h-1 bg-red-500 rounded-full mr-2"></span>
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                    >
                        <span>Sign In</span>
                        <LogIn className="h-5 w-5" />
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-8 text-center">
                    <p className="text-gray-500 text-sm">
                        Don't have an account?{" "}
                        <button className="text-blue-600 hover:text-blue-700 font-medium transition cursor-pointer">
                            Sign up here
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}