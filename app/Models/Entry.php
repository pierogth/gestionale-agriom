<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

  public function retailer(): BelongsTo
  {
    return $this->belongsTo(Retailer::class);
  }
}
