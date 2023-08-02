<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Auths api routes
Route::post('login', 'App\Http\Controllers\Api\UsersController@userLogin');
// Route::post('logout', 'App\Http\Controllers\Api\UsersController@logout');
// routes for companies and employees
Route::apiResource('companies', 'App\Http\Controllers\Api\CompanyController');
Route::apiResource('employees', 'App\Http\Controllers\Api\EmployeeController');

//testing mail for mailtrap
// Route::get('/send-email', function () {
//     $details = [
//         'title' => 'Mailtrap Test Email',
//         'body' => 'This is a test email sent from Laravel using Mailtrap.',
//     ];

//     $recipientEmail = 'sumaimahmed@gmail.com';
//     $recipientName = 'Sumaim Ahmed';

//     Mail::raw($details['body'], function ($message) use ($details, $recipientEmail, $recipientName) {
//         $message->subject($details['title']);
//         $message->to($recipientEmail, $recipientName);
//     });

//     return "Test email sent!";
// });
