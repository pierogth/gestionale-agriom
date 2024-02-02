<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductRetail extends Pivot
{
  protected $table = 'product_retail';

  public $timestamps = false;

  protected $fillable = ['product_id', 'retailer_id', 'quantity'];
}
