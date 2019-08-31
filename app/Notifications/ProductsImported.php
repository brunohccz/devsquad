<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class ProductsImported extends Notification
{
    use Queueable;

    /**
     * @var string
     */
    protected $file;

    /**
     * @var int
     */
    protected $rows;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct($file, $rows)
    {
        $this->file = $file;
        $this->rows = $rows;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->greeting('Hello,')
                    ->line("Import of {$this->file} file is finished")
                    ->line("{$this->rows} products were imported.");
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
