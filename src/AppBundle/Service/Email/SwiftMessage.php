<?php

/**
 * Class SwiftMessage
 *
 * Service class
 *
 * @author  Ryan Kim
 * @module  MyInventory
 */

namespace AppBundle\Service\Email;

class SwiftMessage
{
    private $mailer;
    private $twig;

    /**
     * Constructor
     * @param \Swift_Mailer $
     * @param \Twig_Environment $twig
     */
    public function __construct(\Swift_Mailer $mailer, \Twig_Environment $twig)
    {
        $this->mailer = $mailer;
        $this->twig   = $twig;
    }

    /**
     * Send email
     *
     * @param $subject
     * @param $from
     * @param $email
     * @param $firstName
     * @param $code
     * @return bool
     */
    public function send($subject, $from, $email, $firstName, $code)
    {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($from)
            ->setTo($email)
            ->setBody(
                $this->twig->render(
                    'Emails/registration.html.twig',
                    [
                        'name'  => $firstName,
                        'email' => $email,
                        'code'  => $code
                    ]
                ),
                'text/html'
            );

        $this->mailer->send($message);

        return true;
    }
}