<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Employee;
class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Employee::create([
            "namesurname" => "Stefano Rosso",
            "category" => "Suonatore",
            "credit" =>
                500,
            "shops" => 250,
            "workhours" => 35,
            "€-hour" => 9,


        ]);
    }
}
