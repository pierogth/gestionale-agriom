<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Work extends Model
{
  use HasFactory;

  public function employees()
  {
    return $this->belongsToMany(Employee::class, 'work_employee')->withPivot(
      'work_id',
      'employee_id'
    );
  }
}
