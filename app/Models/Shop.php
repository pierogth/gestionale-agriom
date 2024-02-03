<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Shop extends Model
{
  use HasFactory;

  public function employee(): BelongsTo
  {
    return $this->belongsTo(Employee::class);
  }

  public function land(): BelongsTo
  {
    return $this->belongsTo(Land::class);
  }
}
