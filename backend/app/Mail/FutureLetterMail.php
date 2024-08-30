<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class FutureLetterMail extends Mailable
{
    use Queueable, SerializesModels;

    public $letter;

    /**
     * Create a new message instance.
     *
     * @param  $letter
     * @return void
     */
    public function __construct($letter)
    {
        $this->letter = $letter;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.future_letter')
                    ->with([
                        'content' => $this->letter->content,
                        'deliveryDate' => $this->letter->delivery_date,
                        'createdDate' => $this->letter->created_at->format('Y-m-d'),
                    ]);
    }
}
