<?php

namespace Database\Seeders;

use DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \Illuminate\Support\Facades\DB::table('products')->insert([
            [
                'name' => 'Product 1',
                'description' => 'Description for product 1',
                'image' => 'path/to/image1.jpg',
                'user_name' => 'User Name 1',
                'address' => 'Address for product 1',
                'phone_number' => '1234567890',
                'user_id' => 1, // Assuming user with ID 1 exists
                'category_id' => 1, // Assuming category with ID 1 exists
                'is_approved' => true,
            ],
            // ... Add other products here
        ]);

    }
}
