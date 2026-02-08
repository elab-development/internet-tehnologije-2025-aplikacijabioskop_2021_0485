<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
			'name'=>$this->resource->name,
            'lastname'=>$this->resource->lastname,
			'email'=>$this->resource->email,
			'email_verified_at'=>$this->resource->email_verified_at,
			'password'=>$this->resource->password,
			'remember_token'=>$this->resource->remember_token,
			'created_at'=>$this->resource->created_at,
			'updated_at'=>$this->resource->updated_at,
			'rola'=>$this->resource->rola
            ];
    }
}
