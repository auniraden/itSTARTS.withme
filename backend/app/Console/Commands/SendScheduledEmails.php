<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReminderEmail;


class SendScheduledEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'emails:send-scheduled';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = "Send scheduled emails to users based on their selected date";

    /**
     * Execute the console command.
     */
    public function __construct()
    {
        parent::__construct();
    }
    public function handle()
    {
         // Retrieve users whose scheduled date matches today
         $users = User::whereDate('delivery_date', Carbon::today())->get();
        foreach ($users as $letter) {
            Mail::to($letter->email)->send(new ReminderEmail($letter));
         }
    }
}
