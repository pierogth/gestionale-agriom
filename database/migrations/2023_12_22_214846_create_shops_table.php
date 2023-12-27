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
    Schema::create('shops', function (Blueprint $table) {
      $table->id();
      $table->string('type');
      $table->double('amount');
      $table->text('description')->nullable();
      $table->date('data');
      $table->string('file')->nullable();
      /* chiave ref nullable con land */
      /* chiave ref nullable con employee */
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('shops');
  }
};
