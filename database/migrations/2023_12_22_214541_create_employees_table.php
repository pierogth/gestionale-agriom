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
    Schema::create('employees', function (Blueprint $table) {
      $table->id();
      $table->string('namesurname');
      $table->string('category');
      $table->double('credit');
      $table->double('shops');
      $table->double('workhours');
      /* chiave referenziale workplaces su lands */
      $table->double('€-hour');
      /* acconti conviene creare la pivot */
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('employees');
  }
};
