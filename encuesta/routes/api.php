<?php

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', 'AuthController@User');
    Route::get('/logout', 'AuthController@Logout');
    Route::get('/getEncuestas', 'encuestaController@getEncuestas');
    Route::post('/postEncuesta', 'encuestaController@postEncuesta');
});
Route::post('/loginUser', 'AuthController@login');
Route::post('/register', 'AuthController@Register');

