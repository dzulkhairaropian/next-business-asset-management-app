<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Department;
use App\Models\Location;
use App\Models\Position;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Get initial data for relationships
        $company = Company::where('code', 'DB')->first();
        $department = Department::where('code', 'IT')->first();
        $position = Position::where('code', 'MGR')->first();
        $location = Location::first();

        // Create Roles (Spatie)
        $adminRole = Role::updateOrCreate(['name' => 'admin', 'guard_name' => 'web']);
        $staffRole = Role::updateOrCreate(['name' => 'staff', 'guard_name' => 'web']);

        // Create Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@assetika.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
                'phone' => '08123456789',
                'company_id' => $company?->id,
                'department_id' => $department?->id,
                'position_id' => $position?->id,
                'location_id' => $location?->id,
            ]
        );
        $admin->assignRole($adminRole);

        // Create Regular Staff User
        $staff = User::updateOrCreate(
            ['email' => 'staff@assetika.com'],
            [
                'name' => 'IT Staff',
                'password' => Hash::make('password'),
                'phone' => '08987654321',
                'company_id' => $company?->id,
                'department_id' => $department?->id,
                'position_id' => Position::where('code', 'STF')->first()?->id,
                'location_id' => $location?->id,
            ]
        );
        $staff->assignRole($staffRole);
    }
}
