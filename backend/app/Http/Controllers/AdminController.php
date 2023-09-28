<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers()
    {
        $users = User::get();
        return response()->json($users);
    }

    public function getProducts()
    {
        $products = Product::get();
        return response()->json($products);
    }

    public function getCategories()
    {
        $categories = Category::get();
        return response()->json($categories);
    }


    public function approveProduct($id)
    {
        $product = Product::find($id);
        $product->is_approved = true;
        $product->save();
        return response()->json(['message' => 'Product approved']);
    }

    public function disapproveProduct($id)
    {
        $product = Product::find($id);
        $product->is_approved = false;
        $product->save();
        return response()->json(['message' => 'Product disapproved']);
    }

    public function getStatistics()
    {
        $userCount = User::count();
        $productCount = Product::count();
        $categoryCount = Category::count();

        return response()->json([
            'userCount' => $userCount,
            'productCount' => $productCount,
            'categoryCount' => $categoryCount
        ]);
    }

    public function blockUser($id)
    {
        $user = User::find($id);
        $user->is_blocked = true;  // Assuming you have an is_blocked column
        $user->save();
        return response()->json(['message' => 'User blocked']);
    }

    public function grantAdmin($id)
    {
        $user = User::find($id);
        $user->is_admin = true;  // Assuming you have an is_admin column
        $user->save();
        return response()->json(['message' => 'User granted admin privileges']);
    }


    public function leaderboard()
    {
        $topUsers = User::orderBy('points', 'desc')->take(10)->get(); // Fetch top 10 users by points

        // Add rank to each user
        $rank = 1;
        foreach ($topUsers as $user) {
            $user->rank = $rank++;
        }

        return response()->json($topUsers);
    }

}
