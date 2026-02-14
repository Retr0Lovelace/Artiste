<?php

namespace App\Form;

use App\Entity\User;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\Extension\Core\Type\PasswordType;
use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\IsTrue;
use Symfony\Component\Validator\Constraints\Length;
use Symfony\Component\Validator\Constraints\NotBlank;

class RegistrationFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('firstname', TextType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'login-input',
                    'placeholder' => 'PRÉNOM'
                ],
                'constraints' => [
                    new NotBlank(message: 'Veuillez entrer votre prénom'),
                ],
            ])
            ->add('lastname', TextType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'login-input',
                    'placeholder' => 'NOM'
                ],
                'constraints' => [
                    new NotBlank(message: 'Veuillez entrer votre nom'),
                ],
            ])
            ->add('email', EmailType::class, [
                'label' => false,
                'attr' => [
                    'class' => 'login-input',
                    'placeholder' => 'ADRESSE MAIL'
                ],
                'constraints' => [
                    new NotBlank(message: 'Veuillez entrer votre email'),
                ],
            ])
            ->add('plainPassword', RepeatedType::class, [
                'type' => PasswordType::class,
                'mapped' => false,
                'first_options' => [
                    'label' => false,
                    'attr' => [
                        'class' => 'login-input',
                        'placeholder' => 'MOT DE PASSE',
                        'autocomplete' => 'new-password'
                    ],
                    'constraints' => [
                        new NotBlank(message: 'Veuillez entrer un mot de passe'),
                        new Length(
                            min: 6,
                            minMessage: 'Votre mot de passe doit contenir au moins {{ limit }} caractères',
                            max: 4096
                        ),
                    ],
                ],
                'second_options' => [
                    'label' => false,
                    'attr' => [
                        'class' => 'login-input',
                        'placeholder' => 'CONFIRMATION DU MOT DE PASSE',
                        'autocomplete' => 'new-password'
                    ],
                ],
                'invalid_message' => 'Les mots de passe doivent correspondre',
            ])
            ->add('agreeTerms', CheckboxType::class, [
                'label' => 'Accepter les termes et les conditions',
                'mapped' => false,
                'attr' => [
                    'class' => 'login-checkbox'
                ],
                'constraints' => [
                    new IsTrue(message: 'Vous devez accepter les termes et conditions'),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => User::class,
        ]);
    }
}
