<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;

    protected $fillable = [
        'parent_id',
        'child_id',
        'tutor_id',
        'subject',
        'class_type',
        'rate_per_hour',
        'total_hours',
        'total_amount',
        'payment_status',
        'payment_date',
        'overdue_fee',
    ];

    // Define relationships with the User model
    public function parent()
    {
        return $this->belongsTo(User::class, 'parent_id');
    }

    public function child()
    {
        return $this->belongsTo(User::class, 'child_id');
    }

    public function tutor()
    {
        return $this->belongsTo(User::class, 'tutor_id');
    }
}
