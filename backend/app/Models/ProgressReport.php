<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProgressReport extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'report_date',
        'report',
    ];

    // Define the relationship with the User model
    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}
