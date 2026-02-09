<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projekcije', function (Blueprint $table) {
            $table->id();
            $table->dateTime("vreme_pocetka");
            $table->dateTime("vreme_kraja");
            $table->dateTime("datum");
            $table->foreignId("film")->constrained("filmovi","id");
            $table->foreignId("objekat")->constrained("objekti","id");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projekcije');
    }
};
