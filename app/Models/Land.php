<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Land extends Model
{
  use HasFactory;

  public function shop(): HasOne
  {
    return $this->hasOne(Shop::class);
  }

  public function works()
  {
    return $this->belongsToMany(Work::class, 'work_land')->withPivot(
      'land_id',
      'work_id'
    );
  }
}
