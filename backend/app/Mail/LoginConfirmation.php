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
        $homeUrl = $this->determineHomeUrl($this->user);
        $loginUrl = url("/api/login/confirm/{$this->user->login_token}");

        return $this->view('emails.login_confirmation')
                    ->with([
                        'name' => $this->user->first_name . ' ' . $this->user->last_name,
                        'homeUrl' => $homeUrl,
                        'loginUrl' => $loginUrl,
                    ]);
    }

    private function determineHomeUrl($user)
    {
        $roleHomeUrls = [
            'homeschooler' => '/homeschooler',
            'parents' => '/parents-home',
            'tutor' => '/tutor-home',
        ];

        return url($roleHomeUrls[$user->role->name] ?? '/');
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
