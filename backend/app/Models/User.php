<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 'username', 'password', 'is_admin', 'is_blocked', 'profile_image'
    ];


    protected $hidden = [
        'password', 'remember_token',
    ];

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function incrementPoints($points = 10)
    {
        $this->increment('points', $points);
        $this->save();
    }
}