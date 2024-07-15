<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_classes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('student_id')->constrained('users'); // Foreign key reference to users table
            $table->foreignId('class_id')->constrained('classes'); // Foreign key reference to classes table
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_classes');
    }
};
