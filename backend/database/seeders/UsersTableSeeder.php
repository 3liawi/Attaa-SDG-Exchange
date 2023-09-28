<?php

namespace Database\Seeders;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Schema;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Schema::table('products', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
        });
        // Clear the users table first
        DB::table('users')->truncate();

        // Insert a few sample users
        DB::table('users')->insert([
            [
                'name' => 'علي عمار',
                'username' => 'ali3mmar',
                'password' => Hash::make('password123'),
                'profile_image' => null,
                'is_admin' => true,
                'is_blocked' => false,
                'remember_token' => null,
            ],
            [
                'name' => 'حسن مجيد',
                'username' => 'hassan',
                'password' => Hash::make('password123'),
                'profile_image' => null,
                'is_admin' => false,
                'is_blocked' => false,
                'remember_token' => null,
            ],

        ]);
        Schema::table('products', function (Blueprint $table) {
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }
}
