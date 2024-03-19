<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Retailer;

class RetailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Retailer::create([
            "name" => "Tabacchi Love",
            "place" => "Ostuni",
            "balance" =>  0,
        ]);
        Retailer::create([
            "name" => "Tabacchi & Co",
            "place" => "Castellana",
            "balance" =>  -55,
        ]);
        Retailer::create([
            "name" => "Tabacchi Da Vincenzo",
            "place" => "Noicattaro",
            "balance" =>  80,
        ]);
    }
}
