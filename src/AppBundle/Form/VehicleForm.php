<?php

namespace AppBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\OptionsResolver\OptionsResolver;
use AppBundle\Entity\VehicleEntity;

class VehicleForm extends AbstractType
{
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => VehicleEntity::class,
        ));
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('mfg', TextType::class)
            ->add('model', TextType::class)
            ->add('year', IntegerType::class)
            ->add('color', TextType::class)
            ->add('vin', TextType::class, array('required' => false))
            ->add('plate', TextType::class, array('required' => false))
            ->add('save', SubmitType::class, array('label' => 'Save Car'));
    }
}