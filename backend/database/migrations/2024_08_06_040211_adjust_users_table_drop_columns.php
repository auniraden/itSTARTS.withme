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
            // Check if columns exist before attempting to drop them
            if (Schema::hasColumn('users', 'class_type')) {
                $table->dropColumn('class_type');
            }
            if (Schema::hasColumn('users', 'rate_per_hour')) {
                $table->dropColumn('rate_per_hour');
            }
            if (Schema::hasColumn('users', 'max_students')) {
                $table->dropColumn('max_students');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('class_type')->nullable();
            $table->decimal('rate_per_hour', 8, 2)->nullable();
            $table->integer('max_students')->nullable();
        });
    }
};
