<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Curriculum extends Model
{
    use HasFactory;

    protected $table = 'curriculums';
    protected $fillable = [
        'curriculum_name',
        'link',
    ];

    public function users()
    {
        return $this->belongsTo(User::class, 'id', 'curriculum_id');
    }
}
