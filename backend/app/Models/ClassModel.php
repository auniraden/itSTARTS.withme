<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'tutor_id',
        'curriculum_id',
    ];

    // Define the relationship with the Tutor (User) model
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }

    // Define the relationship with the Curriculum model
    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class, 'curriculum_id');
    }
}
