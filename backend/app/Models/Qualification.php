<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Qualification extends Model
{
    use HasFactory;

    protected $fillable = [
        'tutor_id',
        'document_path',
    ];

    // Define the relationship with the Tutor (User) model
    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
