<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = [
            'المنزل والاثاث',
            'الملابس والاكسسوارات',
            'الالكترونيات والاجهزة الذكية',
            'الكتب والقرطاسية',
            'الالعاب والالعاب الالكترونية',
            'أدوات الرياضة والهواية',
            'الزراعة والنباتات',
            'أدوات المطبخ والأجهزة المنزلية'
        ];

        foreach ($categories as $category) {
            Category::create(['name' => $category]);
        }
    }
}
