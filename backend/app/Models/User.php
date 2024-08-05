<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'role_id',
        'curriculum_id',
        'email_verification_token',
        'email_verified_at',
        'remember_token',
        'login_token',
        'created_at',
        'updated_at',
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class, 'curriculum_id');
    }

    public function progressReports()
    {
        return $this->hasMany(ProgressReport::class, 'email', 'email');
    }

    public function letters()
    {
        return $this->hasMany(Letter::class, 'email', 'email');
    }

    public function goals()
    {
        return $this->hasMany(Goal::class, 'email', 'email');
    }

    public function resources()
    {
        return $this->hasMany(Resource::class, 'email', 'email');
    }
}
