import React, { useState } from 'react';
import { User, Home, File, LogIn, UserPlus, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';

function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const userObj = useSelector((state) => state.userSlice);

    const toggleLogin = () => {
        if (isLoggedIn) {
            setIsLoggedIn(false);
            setUsername('');
        } else {
            setIsLoggedIn(true);
            setUsername(userObj.name);
        }
    };

    return (
        <header className="bg-[#f4f4f4] text-blue-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center mr-6">
                        <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                            <span className="text-white font-bold text-lg">S</span>
                        </div>
                        <span className="font-bold text-xl tracking-tight">
                            <span className="text-blue-900">SMART</span>
                            <span className="text-blue-500">ext</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4 mr-6">
                        <Link
                            to="/AllDocuments"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-50"
                        >
                            <File className="w-4 h-4 mr-1" />
                            Documents
                        </Link>
                        <Link
                            to="/"
                            className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-blue-800 hover:bg-blue-50"
                        >
                            <Home className="w-4 h-4 mr-1" />
                            Home
                        </Link>
                    </div>

                    {/* Sign In / Register */}
                    {!isLoggedIn && (
                        <div className="flex items-center space-x-2 mr-6">
                            <Link
                                to="/Login"
                                className="flex items-center px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                            >
                                <LogIn className="w-4 h-4 mr-1" />
                                Sign In
                            </Link>
                            <Link
                                to="/Register"
                                className="flex items-center px-3 py-1 text-sm text-white bg-blue-800 hover:bg-blue-900 rounded-md"
                            >
                                <UserPlus className="w-4 h-4 mr-1" />
                                Register
                            </Link>
                        </div>
                    )}

                    <div className="flex-grow" />

                    {/* Profile */}
                    <div className="flex items-center space-x-3">
                        {isLoggedIn ? (
                            <>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-blue-800">{username}</span>
                                </div>
                                <button
                                    onClick={toggleLogin}
                                    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md flex items-center"
                                >
                                    <LogOut className="w-4 h-4 mr-1" />
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <User className="w-4 h-4 text-gray-500" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">Guest</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
