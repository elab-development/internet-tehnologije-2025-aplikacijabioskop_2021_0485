<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Film extends Model
{
    /** @use HasFactory<\Database\Factories\FilmFactory> */
    use HasFactory;
    protected $table='filmovi';
    protected $fillable=[
        'id','naziv','zanr','opis','slika','created_at','updated_at'
    ];
}
