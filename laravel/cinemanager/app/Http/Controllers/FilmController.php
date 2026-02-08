<?php

namespace App\Http\Controllers;

use App\Models\Film;
use Response;
use Illuminate\Http\Request;
use App\Http\Resources\FilmCollection;
use App\Http\Resources\FilmResource;
use Illuminate\Support\Facades\Validator;

class FilmController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $filmovi = new FilmCollection(Film::all());
        return Response::json(array("movies"=>$filmovi,"code"=>200),200);
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
        if(auth()->user()->rola!=1)
        {
return Response::json(array(
                'code' => 401,
                'message' => "Unauthorized access.",
            ), 401);
        }
         $validator = Validator::make($request->all(), [
            'movietitle' => 'required|string|max:255',
            'moviedesc'=>'required|string',
            'moviegenre' => 'required|string|max:255',
        ]);


        if($validator->fails())
        {
            return Response::json(array(
                'code' => 400,
                'message' => $validator->errors(),
            ), 400);
        }

        $f = new Film();
        $f->naziv = $request->movietitle;
        $f->opis = $request->moviedesc;
        $f->zanr = $request->moviegenre;
        if($request->moviepicture!=null)
        {
            $f->slika =$request->moviepicture;
        }
        else
        {
            $f->slika = "https://images.unsplash.com/photo-1768813282031-2aec62eee8b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
        }
       

        if($f->save())
        {
            return Response::json(array(
            'code'      =>  200,
            'message'   =>  "Movie created successfully."
             ), 200);
        }
        else
        {
            return Response::json(array(
            'code'      =>  400,
            'message'   =>  "Error creating movie."
             ), 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($film_id)
    {
        return Response::json(array('movie'=>new FilmResource(Film::find($film_id)),'code'=>200),200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Film $film)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        if(auth()->user()->rola!=1)
        {
return Response::json(array(
                'code' => 401,
                'message' => "Unauthorized access.",
            ), 401);
        }
        $validator = Validator::make($request->all(), [
            'movie_id'=>'required|integer',
            
        ]);
        if(!$validator->fails())
        {
            $f = Film::find($request->movie_id);
            if($request->movietitle!=null)
            {
                $f->naziv = $request->movietitle;
            }
            if($request->moviedesc!=null)
            {
                $f->opis = $request->moviedesc;
            }
            if($request->moviepicture!=null)
            {
                $f->slika = $request->moviepicture;
            }
            if($request->moviegenre!=null)
            {
                $f->zanr = $request->moviegenre;
            }
            if($f->update())
            {
                    return Response::json(array(
            'code'      =>  200,
            'message'   =>  "Movie updated successfully."
             ), 200);
            }
            else
                {
                    return Response::json(array(
                'code'      =>  400,
                'message'   =>  "Error updating movie."
                 ), 400);
                }
        }
        else
        {
return Response::json(array(
                'code'      =>  400,
                'message'   =>  $validator->errors()
                 ), 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($film_id)
    {
        //
        if(auth()->user()->rola!=1)
        {
return Response::json(array(
                'code' => 401,
                'message' => "Unauthorized access.",
            ), 401);
        }
        
        $f = Film::find($film_id);
        if($f->delete())
        {
            return Response::json(array(
            'code'      =>  200,
            'message'   =>  "Movie deleted successfully."
             ), 200);
        }
        else
        {
            return Response::json(array(
                'code'      =>  400,
                'message'   =>  "Error deleting movie."
                 ), 400);
        }

    }
}
