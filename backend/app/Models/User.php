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
        'is_approved',
        'login_token',
        'student_id',
        'email_verification_token',
        'content',
        'delivery_date',
    ];

    protected $hidden = [
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // A user belongs to a role
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // A user belongs to a curriculum
    public function curriculum()
    {
        return $this->belongsTo(Curriculum::class);
    }

    // Relationships based on user roles

    // A student has many tasks
    public function tasks()
    {
        if ($this->role_id == 1) { // 1 is the role_id for students
            return $this->hasMany(Task::class, 'student_id');
        }
        return null;
    }



    // A student has many progress reports
    public function progressReports()
    {
        if ($this->role_id == 1) { //  1 is the role_id for students
            return $this->hasMany(ProgressReport::class, 'student_id');
        }
        return null;
    }

    // A student has many letters
    public function letters()
    {
        if ($this->role_id == 1) { //  1 is the role_id for students
            return $this->hasMany(Letter::class, 'student_id');
        }
        return null;
    }


    // A student has many goals
    public function goals()
    {
        if ($this->role_id == 1) { // 1 is the role_id for students
            return $this->hasMany(Goal::class, 'student_id');
        }
        return null;
    }



}
