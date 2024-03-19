<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Um;


class UmSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Um::create([
            "um" => "Kg",
        ]);
        Um::create([
            "um" => "Litri",
        ]);
        Um::create([
            "um" => "Grammi",
        ]);
    }
}
