<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('categories/{category}', [CategoryController::class, 'show']);
Route::get('/search', [ProductController::class, 'search']);
Route::apiResource('products', ProductController::class);

Route::post('/import', [ProductController::class, 'import']);
Route::get('categories/{categoryId}/products', [CategoryController::class, 'getProducts']);


Route::get('/leaderboard', [AdminController::class, 'leaderboard']);


// Routes for authenticated users
Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    // Show user profile
    Route::get('/user', [UserProfileController::class, 'show']);

    // Update user profile
    Route::put('/user/{user}', [UserProfileController::class, 'update']);

    // Get products of a user
    Route::get('/user/products', [UserProfileController::class, 'userProducts']);

    Route::post('/addProduct', [ProductController::class, 'store']);

    Route::get('/user/points', [UserProfileController::class, 'userPoints']);
    Route::get('/user/rank', [UserProfileController::class, 'userRank']);
});

Route::post('/admin/login', [AuthController::class, 'adminLogin']);

Route::middleware(['auth:api', 'admin'])->prefix('admin')->group(function () {
    Route::get('/users', [AdminController::class, 'getUsers']);
    Route::get('/products', [AdminController::class, 'getProducts']);
    Route::get('/categories', [AdminController::class, 'getCategories']);
    Route::post('/products/approve/{id}', [AdminController::class, 'approveProduct']);
    Route::post('/products/disapprove/{id}', [AdminController::class, 'disapproveProduct']);
    Route::get('/statistics', [AdminController::class, 'getStatistics']);
    Route::post('/users/block/{id}', [AdminController::class, 'blockUser']);
    Route::post('/users/grant-admin/{id}', [AdminController::class, 'grantAdmin']);
    Route::get('/leaderboard', [AdminController::class, 'leaderboard']);
});