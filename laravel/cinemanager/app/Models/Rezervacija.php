<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rezervacija extends Model
{
    /** @use HasFactory<\Database\Factories\RezervacijaFactory> */
    use HasFactory;
    protected $table='rezervacije';
    protected $fillable=[
        'id','korisnik','projekcija','mesto','created_at','updated_at'
    ];

}
