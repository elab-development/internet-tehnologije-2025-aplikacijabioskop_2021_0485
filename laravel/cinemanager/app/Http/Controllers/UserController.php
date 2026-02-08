<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return User::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validator = Validator::make($request->all(), [
            'user_id'=>'required|integer',

        ]);
        if(!$validator->fails())
        {
            $user = User::find($request->user_id);
            if ($request->name != null) {
                if ($user->name != $request->name && trim($request->name) != "") {
                $user->name = $request->name;
            }
        }
        if ($request->password != null) {
            if ($user->password != Hash::make($request->password) && trim($request->password) != "") {
                $user->password = Hash::make($request->password);
            }
        }

        if ($request->email != null) {
            if ($user->email != $request->email && trim($request->email) != "") {
                $user->email = $request->email;
            }
        }

        if ($request->lastname != null) {
            if ($user->lastname != $request->lastname && trim($request->lastname) != "") {
                $user->lastname = $request->lastname;
            }
        }

        if ($request->rola != null) {
            if ($user->rola != $request->rola && trim($request->rola) != "") {
                $user->rola = $request->rola;
            }
        }
        $user->update();
        return Response::json(array(
            'code' => 200,
            'message' => "Successfully updated user",
        ), 200);
        }
        else
        {
            return Response::json(array(
                'code' => 400,
                'message' => $validator->errors(),
            ), 400);
        }
    }

    public function updatemyprofile(Request $request)
    {
        $user = auth()->user();
        if ($request->name != null) {
            if ($user->name != $request->name && trim($request->name) != "") {
                $user->name = $request->name;
            }
        }
        if ($request->password != null) {
            if ($user->password != Hash::make($request->password) && trim($request->password) != "") {
                $user->password = Hash::make($request->password);
            }
        }

        if ($request->email != null) {
            if ($user->email != $request->email && trim($request->email) != "") {
                $user->email = $request->email;
            }
        }

        if ($request->lastname != null) {
            if ($user->lastname != $request->lastname && trim($request->lastname) != "") {
                $user->lastname = $request->lastname;
            }
        }

        $user->update();
        return Response::json(array(
            'code' => 200,
            'message' => "Successfully updated user",
        ), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //
    }
}
