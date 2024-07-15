<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('parent_id')->constrained('users'); // Foreign key reference to users table
            $table->foreignId('child_id')->constrained('users');
            $table->foreignId('tutor_id')->constrained('users');
            $table->string('subject');
            $table->enum('class_type', ['one-to-one', 'group']);
            $table->decimal('rate_per_hour', 8, 2);
            $table->integer('total_hours');
            $table->decimal('total_amount', 10, 2);
            $table->enum('payment_status', ['pending', 'paid']);
            $table->timestamp('payment_date')->nullable();
            $table->decimal('overdue_fee', 10, 2)->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
