<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TutorSubject extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutor_id',
        'subject_id'
    ];

    // A tutor subject belongs to a tutor (user)
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // A tutor subject belongs to a subject
    public function subject()
    {
        return $this->belongsTo(Subject::class, 'subject_id');
    }
}
