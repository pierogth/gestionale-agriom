<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Entry;

class EntrySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Entry::create([
            "quantity" => 500,
            "is_payed" =>1,
            "payer" => "Lino",
            "payment_type" => "Contanti",
            "data" => '2023-05-13',
            "type" => 0

        ]);
        Entry::create([
            "quantity" => 1500,
            "is_payed" =>0,
            "payer" => "Orazio",
            "data" => '2023-05-13',
            "type" => 1

        ]);
        Entry::create([
            "quantity" => 5500,
            "is_payed" =>1,
            "payer" => "Livio",
            "payment_type" => "Bonifico",
            "data" => '2023-05-18',
            "type" => 2

        ]);
    }
}
