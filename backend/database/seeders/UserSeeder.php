<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
     {  // add single user as admin in users table by seeding
        User::create([
            'name' => 'admin',
            'email' => 'admin@admin.com ',
            'password' => bcrypt('password')
            // 'auth_token' => Str::random(70)
        ]);
    }
}
