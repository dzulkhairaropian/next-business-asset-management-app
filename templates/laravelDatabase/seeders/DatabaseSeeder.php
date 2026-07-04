<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            CompanySeeder::class,
            DepartmentSeeder::class,
            PositionSeeder::class,
            LocationSeeder::class,
            BrandSeeder::class,
            MasterCategorySeeder::class,
            CategorySeeder::class,
            StatusSeeder::class,
            VendorSeeder::class,
            OperatingSystemSeeder::class,
            UserSeeder::class,
        ]);
    }
}
