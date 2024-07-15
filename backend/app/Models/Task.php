<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'task_name',
        'due_date'
    ];

    // A task belongs to a student (user)
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    // A task belongs to a class
    public function class()
    {
        return $this->belongsTo(ClassModel::class, 'class_id');
    }
}
