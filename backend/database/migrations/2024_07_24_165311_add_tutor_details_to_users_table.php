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
        Schema::table('users', function (Blueprint $table) {
            // Adding fields specific to tutors
            $table->string('class_type')->nullable();
            $table->decimal('rate_per_hour', 8, 2)->nullable();
            $table->integer('max_students')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Dropping fields if rolling back
            $table->dropColumn('class_type');
            $table->dropColumn('rate_per_hour');
            $table->dropColumn('max_students');
        });
    }
};
