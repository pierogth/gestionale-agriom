<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Work;

class WorkSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Work::create([
            "where" => "Torre Mastro",
            "€-hour" => 7,
            "data" =>'2023-09-12',
        ]);
        Work::create([
            "where" => "Torre A Mare",
            "€-hour" => 7,
            "data" =>'2023-09-13',
        ]);
        Work::create([
            "where" => "Torre Canne",
            "€-hour" => 7,
            "data" =>'2023-09-14',
        ]);
    }
}
