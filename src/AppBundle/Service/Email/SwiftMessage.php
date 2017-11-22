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
     *
     * @param \Swift_Mailer $mailer
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
     * @param $template
     * @param $templateParams
     * @return bool
     */
    public function send($subject, $from, $email, $template, $templateParams)
    {
        $message = \Swift_Message::newInstance()
            ->setSubject($subject)
            ->setFrom($from)
            ->setTo($email)
            ->setBody(
                $this->twig->render(
                    "emails" . DIRECTORY_SEPARATOR . $template,
                    $templateParams
                ),
                'text/html'
            );

        $this->mailer->send($message);

        return true;
    }
}