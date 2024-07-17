<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Child extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'email',
    ];

    // Define the relationship with the Parent (User) model
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }
}
