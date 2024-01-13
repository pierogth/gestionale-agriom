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
    Schema::create('works', function (Blueprint $table) {
      $table->id();
      $table->string('where'); /* da collegare a lands??? */
      $table
        ->foreignId('land_id')
        ->nullable()
        ->constrained();
      $table->text('description')->nullable();
      /* pivot per employee e nro ore di lavoro */
      $table->double('€-hour');
      $table->date('data');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('works');
  }
};
