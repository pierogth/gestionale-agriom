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
    Schema::create('retailers', function (Blueprint $table) {
      $table->id();
      $table->string('name');
      $table->string('place');
      /* tipologia tabella pivot */
      /* chiave referenziale a prodotti, prob pivot xk n a n */
      /* collegamento referenziale con employee distributore */
      $table->double('balance');

      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('retailers');
  }
};
