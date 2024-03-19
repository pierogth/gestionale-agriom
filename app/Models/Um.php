<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Um extends Model
{
    use HasFactory;

    protected $fillable=['um'];
    public $timestamps=false;

    public function product(): HasOne
  {
    return $this->hasOne(Product::class);
  }
}
