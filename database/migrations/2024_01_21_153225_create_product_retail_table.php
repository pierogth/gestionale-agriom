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
    Schema::create('product_retail', function (Blueprint $table) {
      $table
        ->foreignId('product_id')
        ->constrained()
        ->onDelete('cascade');
      $table
        ->foreignId('retailer_id')
        ->constrained()
        ->onDelete('cascade');
      $table->double('quantity');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('product_retail');
  }
};
