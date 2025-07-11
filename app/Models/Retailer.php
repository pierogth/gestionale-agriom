<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Retailer extends Model
{
  use HasFactory;

  public function products()
  {
    return $this->belongsToMany(Product::class, 'product_retail')->withPivot(
      'product_id',
      'retailer_id'
    );
  }

  public function entry(): HasOne
  {
    return $this->hasOne(Entry::class);
  }
}
