<?php

namespace App\Http\Controllers;

use App\Imports\ProductsImport;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Facades\Excel;


class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    /**
     * Store a newly created product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Update validation to accept image files
            'address' => 'required|string',
            'phone_number' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        // Handle image upload
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('images'), $imageName);

            // Generate the full URL for the image
            $imagePath = asset('images/' . $imageName);
            $validatedData['image'] = $imagePath;
        }

        // Set user_id and user_name from the authenticated user
        $validatedData['user_id'] = Auth::id();
        $validatedData['user_name'] = Auth::user()->name;

        $product = Product::create($validatedData);


        $pointsToAdd = 10;
        Auth::user()->incrementPoints($pointsToAdd);

        return response()->json([
            'product' => $product,
            'message' => 'Product added successfully!',
            'points' => Auth::user()->points // Return the updated points of the user
        ], 201);
    }





    /**
     * Display the specified product.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json($product);
    }

    /**
     * Update the specified product in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'user_name' => 'sometimes|required|string|max:255',
            'address' => 'sometimes|required|string',
            'phone_number' => 'sometimes|required|string',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($product->image) {
                $oldImagePath = public_path($product->image);
                if (file_exists($oldImagePath)) {
                    unlink($oldImagePath);
                }
            }

            // Save new image
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $validatedData['image'] = 'images/' . $imageName;
        }

        $product->update($validatedData);
        return response()->json($product);
    }

    /**
     * Remove the specified product from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        // Delete image if exists
        if ($product->image) {
            $imagePath = public_path($product->image);
            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $product->delete();
        return response()->json(['message' => 'Product deleted successfully'], 200);
    }

    public function search(Request $request)
    {
        $query = $request->input('query');

        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->orWhere('description', 'LIKE', "%{$query}%")
            ->orWhereHas('category', function ($q) use ($query) {
                $q->where('name', 'LIKE', "%{$query}%");
            })
            ->get();

        return response()->json($products);
    }


    public function import(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'excel' => 'required|mimes:xlsx,xls,csv'
        ]);

        // Import the Excel file
        Excel::import(new ProductsImport, $request->file('excel')->store('temp'));


        return response()->json(['message' => 'All products have been imported!'], 200);
    }
}