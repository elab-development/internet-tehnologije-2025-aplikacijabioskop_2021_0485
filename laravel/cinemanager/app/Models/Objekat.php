<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Objekat extends Model
{
    /** @use HasFactory<\Database\Factories\ObjekatFactory> */
    use HasFactory;
    protected $table='objekti';
    protected $fillable=[
        'id','naziv','adresa','kapacitet','created_at','updated_at'
    ];
}
