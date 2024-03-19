<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable=['name'];
    public $timestamps=false;

    public function product(): HasOne
  {
    return $this->hasOne(Product::class);
  }
}
