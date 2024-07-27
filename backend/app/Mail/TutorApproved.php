<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Queue\SerializesModels;


class TutorApproved extends Mailable
{
    use Queueable, SerializesModels;

    public $tutor;

    public function __construct($tutor)
    {
        $this->tutor = $tutor;
    }

    public function content()
    {
        $frontendBaseUrl = 'http://127.0.0.1:3000';
        $tutorHomepageUrl = $frontendBaseUrl . '/tutor-home';

        return new Content(
            view: 'emails.tutor-approved',
            with: [
                'name' => $this->tutor->first_name . ' ' . $this->tutor->last_name,
                'tutorHomepageUrl' => $tutorHomepageUrl,
            ],
            text: false
        );
    }

}
