<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $fillable = [
        'link',
        'description',
        'student_id'
    ];

    // A resource belongs to a student (user)
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
