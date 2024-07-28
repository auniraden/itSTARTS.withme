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
use Illuminate\Support\Facades\Log;

class LoginConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Login Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $loginUrl = $this->createLoginUrl($this->user);

        return new Content(
            view: 'emails.login_confirmation',
            with: [
                'name' => $this->user->first_name . ' ' . $this->user->last_name,
                'loginUrl' => $loginUrl,
            ],
            text:false
        );
    }

    protected function createLoginUrl($user): string
    {
        $expires = Carbon::now()->addMinutes(60); // Link valid for 60 minutes
        $token = $user->login_token;

        $loginUrl = URL::temporarySignedRoute(
            'login.confirm', $expires, ['token' => $token]
        );
        Log::info('Generated login URL:', ['url' => $loginUrl]);

        return $loginUrl;
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
