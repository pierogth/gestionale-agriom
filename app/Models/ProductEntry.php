<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProductEntry extends Pivot
{
  protected $table = 'product_entry';

  public $timestamps = false;

  protected $fillable = ['product_id', 'entry_id', 'quantity'];
}
