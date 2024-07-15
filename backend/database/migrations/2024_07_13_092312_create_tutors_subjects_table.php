<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tutor_subjects', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tutor_id')->constrained('users'); // Foreign key reference to users table
            $table->foreignId('subject_id')->constrained('subjects'); // Foreign key reference to subjects table
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tutor_subjects');
    }
};
