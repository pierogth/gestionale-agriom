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
    Schema::create('entries', function (Blueprint $table) {
      $table->id();
      /* chiave referenziale pivot a prodotti */
      $table->double('quantity');
      $table->boolean('is_payed');
      /* relazione nullable con rivenditori per scalo del saldo in caso payed */
      $table
        ->foreignId('retailer_id')
        ->nullable()
        ->constrained();
      $table->boolean('type')->nullable();
      /* payer tipo enum rivenditori|ecommerce|privato */
      $table->string('payer');
      $table->text('description')->nullable();
      $table->string('payment_type')->nullable();
      $table->date('data');
      $table->string('file')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('entries');
  }
};
