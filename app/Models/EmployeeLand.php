<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class EmployeeLand extends Pivot
{
  protected $table = 'employee_land';

  public $timestamps = false;

  protected $fillable = ['employee_id', 'land_id'];
}
