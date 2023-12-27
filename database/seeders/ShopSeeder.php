<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Shop;

class ShopSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Shop::create([
            "type" => "Acquisto utensili",
            "amount" => 2000,
            "data" =>"2023-12-12",
        ]);
        Shop::create([
            "type" => "Pagamento collaboratori",
            "amount" => 3500,
            "data" =>"2023-12-12",
        ]);
        Shop::create([
            "type" => "Manutenzione Auto",
            "amount" => 200,
            "data" =>"2023-12-12",
        ]);
    }
}
