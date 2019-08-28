<?php

namespace App\Exceptions;

use Illuminate\Validation\ValidationException;

class VerifyEmailException extends ValidationException
{

    /**
     * @param $user
     * @return VerifyEmailException
     */
    public static function forUser($user)
    {
        return static::withMessages([
            'email' => [
                __('You must <a href=":url">verify</a> your email first', [
                    "/email/resend?email=".urlencode($user->email)
                ])
            ]
        ]);
    }
}
