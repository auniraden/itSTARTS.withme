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
            if (Schema::hasColumn('users', 'google_access_token')) {
                $table->dropColumn('google_access_token');
            }
            if (Schema::hasColumn('users', 'google_refresh_token')) {
                $table->dropColumn('google_refresh_token');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->text('google_access_token')->nullable();
            $table->text('google_refresh_token')->nullable();
        });
    }
};
