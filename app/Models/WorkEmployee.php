<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Pivot;

class WorkEmployee extends Pivot
{
  protected $table = 'work_employee';

  public $timestamps = false;

  protected $fillable = ['work_id', 'employee_id', 'nrhours'];
}
