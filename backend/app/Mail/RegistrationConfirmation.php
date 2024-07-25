<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\URL;

class RegistrationConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;
    public $verificationUrl;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
        $this->verificationUrl = $this->createVerificationUrl($user);
    }

    protected function createVerificationUrl($user)
{
    $expires = Carbon::now()->addMinutes(60); // Link valid for 60 minutes
    return URL::temporarySignedRoute(
        'verification.verify', $expires, ['user' => $user->id]
    );
}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Registration Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content()
    {
        return $this->view('emails.registration_confirmation')
        ->with([
            'name' => $this->user->first_name . ' ' . $this->user->last_name,
            'verificationUrl' => $this->verificationUrl,
        ]);
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
