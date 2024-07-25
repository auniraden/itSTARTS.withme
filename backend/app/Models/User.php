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
        'firstName',
        'lastName',
        'email',
        'role_id',
        'curriculum_id'
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

    // A student has many tasks
    public function tasks()
    {
        return $this->hasMany(Task::class, 'student_id');
    }

    // A tutor has many subjects
    public function tutorSubjects()
    {
        return $this->hasMany(TutorSubject::class, 'tutor_id');
    }

    // A student has many progress reports
    public function progressReports()
    {
        return $this->hasMany(ProgressReport::class, 'student_id');
    }

    // A student has many letters
    public function letters()
    {
        return $this->hasMany(Letter::class, 'student_id');
    }

    // A parent has many invoices
    public function invoices()
    {
        return $this->hasMany(Invoice::class, 'student_id');
    }

    // A student has many goals
    public function goals()
    {
        return $this->hasMany(Goal::class, 'student_id');
    }

    // A parent has many children
    public function children()
    {
        return $this->hasMany(Child::class, 'parent_id');
    }

    // A user has many chats
    public function chats()
    {
        return $this->hasMany(Chat::class, 'user_id');
    }

    // A tutor has many classes
    public function classes()
    {
        return $this->hasMany(ClassModel::class, 'tutor_id');
    }

    // A tutor has many qualifications
    public function qualifications()
    {
        return $this->hasMany(Qualification::class, 'tutor_id');
    }

}
