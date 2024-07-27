<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
    public function content()
{
    $loginUrl = url("/api/login/confirm/{$this->user->login_token}");

    return new Content(
        view: 'emails.login_confirmation',
        with: [
            'name' => $this->user->first_name . ' ' . $this->user->last_name,
            'loginUrl' => $loginUrl,
        ],
        text: false
    );
}

    private function determineHomeUrl($user)
    {
        $frontendBaseUrl = 'http://127.0.0.1:3000';
        $roleHomeUrls = [
            1 => '/homeschooler',
            2 => '/parents-home',
            3 => '/tutor-home',
        ];

        return $frontendBaseUrl . ($roleHomeUrls[$user->role->name] ?? '/');
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
