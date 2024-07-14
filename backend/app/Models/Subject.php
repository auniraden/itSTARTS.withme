<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    // A subject has many tutor subjects
    public function tutorSubjects()
    {
        return $this->hasMany(TutorSubject::class);
    }
}
