<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update the curriculums table
        Schema::table('curriculums', function (Blueprint $table) {
            // Add new columns
            $table->string('curriculum_name');
            $table->string('link')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Drop the new columns
        Schema::dropIfExists('curriculums');
    }
};
