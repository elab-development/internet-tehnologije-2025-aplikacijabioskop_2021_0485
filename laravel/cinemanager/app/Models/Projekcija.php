<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations;

class Projekcija extends Model
{
    /** @use HasFactory<\Database\Factories\ProjekcijaFactory> */
    use HasFactory;
    protected $table='projekcije';
    protected $fillable=[
        'id','vreme_pocetka','vreme_kraja','datum','film','objekat','created_at','updated_at'
    ];

    public function film_obj()
    {
        return $this->hasOne(Film::class,'film','id');
    }

    public function objekat_obj()
    {
        return $this->hasOne(Objekat::class,'objekat','id');
    }
    
}
