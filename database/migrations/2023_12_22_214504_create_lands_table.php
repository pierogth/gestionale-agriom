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
    Schema::create('lands', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('owner');
      $table->double('dimension');
      $table->string('um');
      $table->string('coltivation');
      $table->double('workhours')->nullable();
      /* chiave referenziale pivot su works */
      $table->text('productions')->nullable();
      $table->text('description')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('lands');
  }
};
