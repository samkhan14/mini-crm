import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const navigate = useNavigate();

    async function loginUser(e) {
        e.preventDefault();
        let item = { email, password };

        // try {
            let result = await fetch('http://127.0.0.1:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item)
            });

            // const data = await result.json();
            result = await result.json();
            if(result['email'] == "Email is required"){
                alert(result['email'])

            } else if (result['email'] == "Email does not exists"){
                alert(result['email'])
            }
            else if (result['email'] == "Email does not exists"){
                alert(result['email'])
            }
            else if (result['email'] == "The email must be a valid email address."){
                alert(result['email'])
            }
            else if (result['message'] == "Email is Incorrect!"){
                alert(result['message'])

            } else if (result['password']=="Password is required"){
                alert(result['password'])

            } else if (result['password'] == "Password is Incorrect!"){
                alert(result['password'])
            } 
            else{
                localStorage.setItem("user", JSON.stringify(result))
                navigate('/home');
            }

        //     if (result) {
        //         localStorage.setItem("user", JSON.stringify(result))
        //          navigate('/home');
        //     } else {
        //         let checkerror = setError(result.message);
        //         console.warn(checkerror) // Use the error message from the API response
        //     }
        // } catch (error) {
        //     console.error('Error during login:', error);
        // }
    }

    return (
        <div className="login-dark">
            <form>
                <h2 className="sr-only">Please Login</h2>
                <div className="illustration">
                    <i className="icon ion-ios-locked-outline"></i>
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                    />
                </div>
                <div className="form-group">
                    <input
                        className="form-control"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-block" onClick={loginUser}>
                        Log In
                    </button>
                </div>
                {/* {error && <p className="error-message">{error}</p>} */}
            </form>
        </div>
    );
};
