<?php

namespace App\Jobs;

use App\Models\Letter;
use App\Mail\FutureLetterMail;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendFutureLetterJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $letter;

    /**
     * Create a new job instance.
     */
    public function __construct(Letter $letter)
    {
        $this->letter = $letter;

    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        Mail::to($this->letter->email)->send(new FutureLetterMail($this->letter));

    }
}
