<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::create('work_land', function (Blueprint $table) {
      $table
        ->foreignId('land_id')
        ->constrained()
        ->onDelete('cascade');
      $table
        ->foreignId('work_id')
        ->constrained()
        ->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('work_land');
  }
};
