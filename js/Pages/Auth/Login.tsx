import { Link, useForm, Head } from '@inertiajs/react';

import React, { useState } from 'react';
import useRoute from '@/Hooks/useRoute';

import LoginLayout from '@/Layouts/LoginLayout';

import Footer from '@/Pages/Auth/Footer';

import { Button, Input, Toggle, Alert } from 'design-react-kit';
import FooterLogin from '@/Pages/Auth/FooterLogin';

interface Props {
  canResetPassword: boolean;
  status: string;
}

export default function Login({ canResetPassword, status }: Props) {
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const route = useRoute();
  const form = useForm({
    email: 'a.gregoli@progettiesoluzioni.it',
    password: '12345678Aa!',
    remember: '',
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    form.post(route('login'), {
      onError: (e: any) => {
        setErrors(e);
      },
      onFinish: () => {
        setLoading(false);
        form.reset('password');
      },
    });
  }

  return (
    <>
      <LoginLayout>
        <Head title="login" />

        <form onSubmit={onSubmit} className={'h-100'}>
          <div className="d-flex align-items-center h-100">
            <div className={'w-100 login-container'}>
              <div className={'bg-primary mb-4 small-logo'}>
                <img src={'/images/logo.png'} width={'230px'} />
              </div>
              <h4 className={''}>Accedi su EasySynergy</h4>

              <p className={'light-weight'}>Inserisci i tuoi dati</p>

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
                  required
                  type="email"
                  label={'Email'}
                  id="email"
                  placeholder="Inserisci email"
                  value={form.data.email}
                  onChange={e => form.setData('email', e.currentTarget.value)}
                />

                <Input
                  required
                  type="password"
                  label={'Password'}
                  id="password"
                  wrapperClassName={'form-group-custom'}
                  value={form.data.password}
                  onChange={e =>
                    form.setData('password', e.currentTarget.value)
                  }
                />

                <div className={'d-flex'}>
                  <Toggle label={''} disabled={false} id="toggleEsempio1a" />

                  <label htmlFor={'toggleEsempio1a'} className={'light-small'}>
                    Ricorda le credenziali di accesso
                  </label>
                </div>

                <hr />

                <div className="row ">
                  <div className="col-12 col-md-8 align-self-center">
                    <span className={'s14w400'}>Non riesci ad accedere?</span>
                    <br />
                    <Link href={route('password.request')} className="s14w700">
                      Recupera le tue credenziali
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
                      size="sm"
                      disabled={loading}
                    >
                      Accedi
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
    </>
  );
}
