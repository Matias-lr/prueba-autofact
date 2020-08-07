<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function User(Request $request){
        return $request->user();
    }
    public function login(Request $request){
        $validator = Validator::make($request->all(),[
            'email' => 'required|email',
            'password' => 'required',
            'device_name' => 'required'
        ]);
        $user = User::where('email', $request->email)->first();
        if($validator->fails()){
            return response($validator->errors(),'400');
        }
        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }
            return $user->createToken($request->device_name)->plainTextToken;
    }
    public function Register(Request $request){
        $validator=Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'type' => 'required',
            'password' => 'required'
        ]);
        if($validator->fails()){
            return response($validator->errors(),'400');
        }
        User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'type' => $request['type'],
            'password' => Hash::make($request['password'])
        ]);
        return response('register complete',200);
    }
    public function Logout(Request $request){
        $user = $request->user();
        if($request->user()->tokens()->where('id',$user->currentAccessToken()->id)->delete()){
            return response('logout succeful',200);
        }else{
            return response("can't logout",401);
        }
    }
    public function sactum(){
        return response('no se pudo obtener al usuario','410');
    }
}
