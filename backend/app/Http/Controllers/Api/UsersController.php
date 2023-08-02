<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UsersController extends Controller
{
    // user login
    public function userLogin(Request $request)
    {
        if ($request->isMethod('post')) {
            $data = $request->input();
            // validation rules
            $rules = [
                'email' => 'required|email|exists:users',
                'password' => 'required|string',
            ];

            $customMsgs = [
                "email.required" => "Email is required",
                "email.exists" => "Email does not exists",
                "password.required" => "Password is required"
            ];

            $validator = Validator::make($data, $rules, $customMsgs);
            if ($validator->fails()) {
                return response()->json($validator->errors(), 422);
            }

            // verify user email
            $userCount = User::where('email', $data['email'])->count();
            if ($userCount > 0) {
                $userDetails = User::where('email', $data['email'])->first();
                // verify password
                if (password_verify($data['password'], $userDetails->password)) {
                    //update token
                    // $auth_token = Str::random(60);
                    // User::where('email', $data['email'])->update(['auth_token' => $auth_token]);
                    return response()->json(["userDetails"=> $userDetails, "status" => true, "message" => 'User Loggedin Successfully'], 201);
                } else {
                    $message = "Password is invalid";
                    return response()->json(['status' => false, 'message' => $message], 422);
                }
            } else {
                $message = "Email does not exist!";
                return response()->json(['status' => false, 'message' => $message], 422);
            }
        }
    }

    //user logout
    public function logout(Request $request)
    {
        // first check token in header
        // $auth_token = $request->header('Authorization');
        // if (empty($auth_token)) {
        //     $msg = "User Token is missing";
        //     return response()->json(['status' => false, 'message' => $msg], 422);
        // }
        // now remove the auth_token and get logout
        // else {

        //     $auth_token = str_replace("Bearer ", "", $auth_token);
        //     $usercount = User::where('auth_token', $auth_token)->count();
        //     if ($usercount > 0) {
        //         // update user token to null
        //         User::where('auth_token', $auth_token)->update(['auth_token' => NULL]);
        //         $msg = "User Logged out Successfully";
        //         return response()->json(['status' => true, 'message' => $msg], 200);
        //     }
        // }
    }
}
