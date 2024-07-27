<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Content;

class TutorDisapproved extends Mailable
{
    use Queueable, SerializesModels;

    public $tutor;
    public $reasons;

    public function __construct($tutor, $reasons)
    {
        $this->tutor = $tutor;
        $this->reasons = $reasons;
    }

    public function content()
    {
        return new Content(
            view: 'emails.tutor-disapproved',
            with: [
                'name' => $this->tutor->first_name . ' ' . $this->tutor->last_name,
                'reasons' => $this->reasons,
            ],
            text: false
        );
    }
}
