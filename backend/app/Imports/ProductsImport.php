<?php

namespace App\Imports;

use App\Models\Product;
use Maatwebsite\Excel\Concerns\ToModel;


class ProductsImport implements ToModel
{
    public function model(array $row)
    {
        return new Product([

            'name'         => $row[0],
            'description'  => $row[1],
            'image'        => $row[2],
            'user_name'    => $row[3],
            'address'      => $row[4],
            'phone_number' => $row[5],
            'user_id'      => $row[6],
            'category_id'  => $row[7],
            'is_approved'  => $row[8],

        ]);
    }
}