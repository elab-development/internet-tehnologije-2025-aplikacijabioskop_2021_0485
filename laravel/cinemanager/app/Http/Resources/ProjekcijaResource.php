<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjekcijaResource extends JsonResource
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
			'vreme_pocetka'=>$this->resource->vreme_pocetka,
			'vreme_kraja'=>$this->resource->vreme_kraja,
			'datum'=>$this->resource->datum,
			'film'=>$this->resource->film,
			'objekat'=>$this->resource->objekat,
			'created_at'=>$this->resource->created_at,
			'updated_at'=>$this->resource->updated_at

          ];
    }
}
