import { useForm, Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';

import LoginLayout from '@/Layouts/LoginLayout';
import Footer from '@/Pages/Auth/Footer';
import { Alert, Button, Input } from 'design-react-kit';
import FooterLogin from '@/Pages/Auth/FooterLogin';

interface Props {
  status: string;
}

export default function ForgotPassword({ status }: Props) {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const form = useForm({
    email: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    form.post(route('password.email'), {
      onError: (e: any) => {
        setLoading(false);

        setErrors(e);
      },
    });
  }

  return (
    <LoginLayout>
      <Head title="Forgot Password" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600 dark:text-green-400">
          {status}
        </div>
      )}

      <form onSubmit={onSubmit} className={'h-100'}>
        <div className="d-flex align-items-center h-100">
          <div className={'w-100 login-container'}>
            <div className={'bg-primary mb-4 small-logo'}>
              <img src={'/images/logo.png'} width={'230px'} />
            </div>

            <p className={'light-weight'}>
              Inserisci la tua email per reimpostare la password
            </p>

            {errors && (
              <div className="login-form mt-5 error-container">
                <div className="row">
                  <div className="col-12">
                    <Alert color="danger" className={'alert-login'}>
                      Utente inesistente o non abilitato!
                    </Alert>
                  </div>
                </div>
              </div>
            )}

            <div className="login-form mt-5">
              <Input
                autoFocus
                required
                type="email"
                label={'Email'}
                id="email"
                placeholder="Inserisci email"
                value={form.data.email}
                onChange={e => form.setData('email', e.currentTarget.value)}
              />

              <div className="row ">
                <div className="col-12 col-md-8 align-self-center">
                  <span className={'s14w400'}>Non riesci ad accedere?</span>
                  <br />
                  <Link href={route('login')} className="s14w700">
                    Ritorna alla pagina di login
                  </Link>{' '}
                  |{' '}
                  <Link href={'/'} className="s14w700">
                    torna alla home
                  </Link>
                </div>
                <div className="col-12 col-md-4 align-self-center">
                  <Button
                    block
                    type="submit"
                    color="primary"
                    className={'rounded'}
                    disabled={loading}
                    size="sm"
                  >
                    Email password reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row position-bottom">
          <div className="col-12 col-md-12">
            <FooterLogin />
          </div>
        </div>
      </form>
    </LoginLayout>
  );
}
