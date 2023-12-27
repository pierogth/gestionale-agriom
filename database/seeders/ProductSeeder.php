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
            "name" => "Olio EVO",
            "quantity" => 50,
            "um" =>
                "Litri",
            "category" => "Oli",
          //  "pieces" => 3,
            "lot" => "OlioBuono2023",
            "type"=>0
        ]);
        Product::create([
            "name" => "Mandorle",
            "quantity" => 50,
            "um" =>
                "Kg",
            "category" => "Frutta",
          //  "pieces" => 3,
            "lot" => "Mandorlaje2023",
            "type"=>0
        ]);
        Product::create([
            "name" => "Lupini",
            "quantity" => 50,
            "um" =>
                "Kg",
            "category" => "Legumi",
            //"pieces" => 3,
            "lot" => "OlioBuono2023",
            "type"=>0
        ]);
    }
}
