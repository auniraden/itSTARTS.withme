<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $fillable = [
        'curriculum_name',
        'link',
    ];

    // Define the relationship with the Class model
    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'curriculum_id');
    }
}
