<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = $user->createToken('auth_token')->accessToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }


    public function login(Request $request)
    {
        $loginData = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (!auth()->attempt($loginData)) {
            return response(['message' => 'بيانات الدخول غير صحيحة
            ']);
        }

        /** @var \App\Models\User $user */
        $user = auth()->user();
        $token = $user->createToken('auth_token')->accessToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }


    public function adminLogin(Request $request)
    {
        $loginData = $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        if (Auth::attempt($loginData)) {
            /** @var \App\Models\User $user */
            $user = auth()->user();


            // Check if the user is an admin
            if ($user->is_admin == 1) {
                $token = $user->createToken('auth_token')->accessToken;

                return response()->json([
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]);
            } else {
                return response(['message' => 'ليس لديك الصلاحيات للوصول إلى هذه الصفحة'], 403);
            }
        } else {
            return response(['message' => 'بيانات الدخول غير صحيحة'], 401);
        }
    }

    public function logout(Request $request)
    {
        $token = $request->user()->token();

        // Revoke the token
        $token->revoke();

        return response()->json([
            'message' => 'Successfully logged out'
        ]);
    }

















    //Admin Auth


}