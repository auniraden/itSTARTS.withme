<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'class_id',
        'schedule_time'
    ];

    // A schedule belongs to a user
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // A schedule belongs to a class
    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }
}
