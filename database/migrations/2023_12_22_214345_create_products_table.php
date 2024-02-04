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
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->double('quantity');
      $table->string('um');
      $table->string('category');
      $table->integer('pieces')->nullable();
      $table->string('lot');
      $table->text('description')->nullable();
      $table->string('image')->nullable();
      /* 0 for sfuso 1 per conf */
      $table->boolean('type');
      $table->integer('sfuso_id')->nullable();

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
