<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
  use HasFactory;

  public function products()
  {
    return $this->belongsToMany(Product::class, 'product_entry')->withPivot(
      'entry_id',
      'product_id'
    );
  }
}
