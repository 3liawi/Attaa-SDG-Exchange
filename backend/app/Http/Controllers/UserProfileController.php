<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;


class UserProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // Ensure the user is authenticated for all methods in this controller
    }

    public function show()
    {
        $user = Auth::user(); // Get the currently authenticated user
        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = Auth::user(); // Get the currently authenticated user

        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('profile_image')) {
            // Delete the old image if it exists
            if ($user->profile_image) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $user->profile_image));
            }

            $imageName = time() . '.' . $request->profile_image->extension();
            $path = $request->profile_image->storeAs('profile_images', $imageName, 'public');
            $data['profile_image'] = '/storage/' . $path;
        }
        /** @var \App\Models\User $user */
        $user = Auth::user();

        $user->update($data);

        return response()->json(['message' => 'Profile updated successfully.', 'user' => $user]);
    }

    public function userProducts()
    {
        $user = Auth::user(); // Get the currently authenticated user
        return response()->json($user->products);
    }


    public function userPoints()
    {
        $user = Auth::user(); // Get the currently authenticated user
        return response()->json(['points' => $user->points]);
    }

    public function userRank()
    {
        $user = Auth::user();
        $rank = User::where('points', '>', $user->points)->count() + 1;
        return response()->json(['rank' => $rank]);
    }
}