<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
use App\Models\Land;

class LandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Land::create([
            "name" => "Latifondo SUD",
            "owner" => "Pierino",
            "dimension" =>500,
            "um" => "are",
            "coltivation" => "Rucola",
        ]);
        Land::create([
            "name" => "Latifondo OVEST",
            "owner" => "Girolamo",
            "dimension" =>200,
            "um" => "are",
            "coltivation" => "Spinaci",
        ]);
        Land::create([
            "name" => "Latifondo EST",
            "owner" => "Alfonso",
            "dimension" =>100,
            "um" => "m2",
            "coltivation" => "Barbabietola",
        ]);
    }
}
