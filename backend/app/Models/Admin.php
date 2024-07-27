<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;


class Admin extends Authenticatable
{
    use HasFactory;

    // The table associated with the model.
    protected $table = 'admins';

    // The attributes that are mass assignable.
    protected $fillable = ['name', 'email', 'password'];

    // The attributes that should be hidden for arrays.
    protected $hidden = ['password', 'remember_token'];
}
