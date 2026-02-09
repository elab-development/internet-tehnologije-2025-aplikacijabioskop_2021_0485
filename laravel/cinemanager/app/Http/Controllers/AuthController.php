<?php

namespace App\Http\Controllers;
use Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'lastname'=>'required|string|max:255',
            'email' => 'required|string|max:255|email|unique:users',
            'password' => 'required|string|min:3'
        ]);


        if($validator->fails())
        {
            return Response::json(array(
                'code' => 400,
                'message' => $validator->errors(),
            ), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'lastname'=>$request->lastname,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;
        return Response::json(array(
            'code'      =>  200,
            'message'   =>  "User ".$user->name." successfully registered.",
            'access_token' => $token, 
            'token_type' => 'Bearer'
        ), 200);

    }

    public function logon(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return Response::json(array(
                'code' => 401,
                'message' => "Unauthorized access."
            ), 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        $token = $user->createToken('auth_token')->plainTextToken;

        return Response::json(array(
            'code' => 200,
            'message' => "User " . $user->name . " logged in.",
            'user_id'=>auth()->user()->id,
            'username'=>$user->name." ".$user->lastname,
            'rola'=>$user->rola,
            'access_token' => $token,
            'token_type' => 'Bearer',

        ), 200);
    }


    public function logoff()
    {
        auth()->user()->tokens()->delete();
        return Response::json(array(
            'code' => 200,
            'message' => "User " . auth()->user()->name . " logged off.",
        ), 200);
    }
}
