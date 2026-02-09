<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ObjekatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
			'id'=>$this->resource->id,
			'naziv'=>$this->resource->naziv,
			'adresa'=>$this->resource->adresa,
			'kapacitet'=>$this->resource->kapacitet,
			'created_at'=>$this->resource->created_at,
			'updated_at'=>$this->resource->updated_at

          ];
    }
}
