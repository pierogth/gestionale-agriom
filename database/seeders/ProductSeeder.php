<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Product;

class ProductSeeder extends Seeder
{
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run()
  {
    Product::create([
      'name' => 'Olio EVO',
      'quantity' => 50,
      //'um' => 'Litri',
      'category_id' => 1,
      'um_id' => 1,
      //  "pieces" => 3,
      'lot' => 'OlioBuono2023',
      'type' => 1,
    ]);
    Product::create([
      'name' => 'Mandorle',
      'quantity' => 50,
     // 'um' => 'Kg',
      //'category' => 'Frutta',
      'category_id' => 1,
      'um_id' => 1,

      //  "pieces" => 3,
      'lot' => 'Mandorlaje2023',
      'type' => 1,
    ]);
    Product::create([
      'name' => 'Lupini',
      'quantity' => 50,
    //  'um' => 'Kg',
      //'category' => 'Legumi',
      'category_id' => 1,
      'um_id' => 1,

      //"pieces" => 3,
      'lot' => 'OlioBuono2023',
      'type' => 1,
    ]);
    //Prodotti al dettaglio
    Product::create([
      'name' => '5L Olio EVO',
      'quantity' => 5,
    //  'um' => 'Litri',
      //'category' => 'Oli',
      'category_id' => 1,
      'um_id' => 1,

      'sfuso_id' => 1,
      //  "pieces" => 3,
      'lot' => 'OlioBuono2023',
      'type' => 0,
    ]);
    Product::create([
      'name' => 'Confezione 300g Mandorle',
      'quantity' => 0.3,
    //  'um' => 'Kg',
      //'category' => 'Frutta',
      'category_id' => 1,
      'um_id' => 1,

      'sfuso_id' => 2,
      //  "pieces" => 3,
      'lot' => 'Mandorlaje2023',
      'type' => 0,
    ]);
    Product::create([
      'name' => 'Confezione 100g Lupini',
      'quantity' => 0.1,
    //  'um' => 'Kg',
      //'category' => 'Legumi',
      'category_id' => 1,
      'um_id' => 1,

      'sfuso_id' => 3,
      //"pieces" => 3,
      'lot' => 'Lupin98',
      'type' => 0,
    ]);
  }
}
