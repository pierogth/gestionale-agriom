<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkLand extends Pivot
{
  protected $table = 'work_land';

  public $timestamps = false;

  protected $fillable = ['work_id', 'land_id'];
}
