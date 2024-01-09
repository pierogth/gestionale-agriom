import { useForm, Head, Link } from '@inertiajs/react';
import classNames from 'classnames';
import React, { useRef, useState } from 'react';
import useRoute from '@/Hooks/useRoute';
import AuthenticationCard from '@/Components/AuthenticationCard';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';

import LoginLayout from '@/Layouts/LoginLayout';
import { Alert, Button, Input, Toggle } from 'design-react-kit';
import Footer from '@/Pages/Auth/Footer';

export default function TwoFactorChallenge() {
  const route = useRoute();
  const [recovery, setRecovery] = useState(false);
  const form = useForm({
    code: '',
    recovery_code: '',
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  const recoveryCodeRef = useRef<HTMLInputElement>(null);
  const codeRef = useRef<HTMLInputElement>(null);

  function toggleRecovery(e: React.FormEvent) {
    e.preventDefault();
    const isRecovery = !recovery;
    setRecovery(isRecovery);

    setTimeout(() => {
      if (isRecovery) {
        recoveryCodeRef.current?.focus();
        form.setData('code', '');
      } else {
        codeRef.current?.focus();
        form.setData('recovery_code', '');
      }
    }, 100);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    form.post(route('two-factor.login'), {
      onError: (e: any) => {
        setErrors(e);
      },
      onFinish: () => {
        setLoading(false);
      },
    });
  }

  return (
    <LoginLayout>
      <Head title="Two-Factor Confirmation" />

      <form onSubmit={onSubmit} className={'h-100'}>
        <div className="d-flex align-items-center h-100">
          <div className={'w-100 login-container'}>
            <div className={'bg-primary mb-4 small-logo'}>
              <img src={'/images/logo.png'} width={'230px'} />
            </div>
            <h4 className={''}>Accedi su EasySynergy</h4>

            <p className={'light-weight'}>Google Authenticator</p>

            {errors && (
              <div className="login-form mt-5 error-container">
                <div className="row">
                  <div className="col-12">
                    <Alert color="danger" className={'alert-login'}>
                      Autenticazione fallita!
                    </Alert>
                  </div>
                </div>
              </div>
            )}
            <div className="login-form mt-5">
              {recovery ? (
                <Input
                  required
                  id="recovery_code"
                  label={'Codice di recupero'}
                  type="text"
                  className="mt-1 block w-full"
                  value={form.data.recovery_code}
                  onChange={e =>
                    form.setData('recovery_code', e.currentTarget.value)
                  }
                  autoFocus
                  autoComplete="one-time-code"
                  wrapperClassName={'form-group-custom'}
                />
              ) : (
                <Input
                  required
                  id="code"
                  type="text"
                  label={'Codice di autenticazione'}
                  inputMode="numeric"
                  className="mt-1 block w-full"
                  value={form.data.code}
                  onChange={e => form.setData('code', e.currentTarget.value)}
                  autoFocus
                  wrapperClassName={'form-group-custom'}
                />
              )}

              <div className="row ">
                <div className="col-12 col-md-8 align-self-center">
                  <span className={'s14w400'}>Non riesci ad accedere?</span>
                  <br />

                  <Button
                    type="button"
                    outline
                    color="link"
                    onClick={toggleRecovery}
                    className={'link-button-left text-left'}
                  >
                    {recovery
                      ? 'Utilizza un codice di autenticazione'
                      : 'Utilizza  un codice di recupero'}
                  </Button>
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
            <Footer />
          </div>
        </div>
      </form>

      {/*
      <AuthenticationCard>
        <Head title="Two-Factor Confirmation" />

        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
          {recovery
            ? 'Please confirm access to your account by entering one of your emergency recovery codes.'
            : 'Please confirm access to your account by entering the authentication code provided by your authenticator application.'}
        </div>

        <form onSubmit={onSubmit}>
          {recovery ? (
            <div>
              <InputLabel htmlFor="recovery_code">Recovery Code</InputLabel>
              <TextInput
                id="recovery_code"
                type="text"
                className="mt-1 block w-full"
                value={form.data.recovery_code}
                onChange={e =>
                  form.setData('recovery_code', e.currentTarget.value)
                }
                ref={recoveryCodeRef}
                autoComplete="one-time-code"
              />
              <InputError
                className="mt-2"
                message={form.errors.recovery_code}
              />
            </div>
          ) : (
            <div>
              <InputLabel htmlFor="code">Code</InputLabel>

              <TextInput
                id="code"
                type="text"
                inputMode="numeric"
                className="mt-1 block w-full"
                value={form.data.code}
                onChange={e => form.setData('code', e.currentTarget.value)}
                autoFocus
                autoComplete="one-time-code"
                ref={codeRef}
              />
              <InputError className="mt-2" message={form.errors.code} />
            </div>
          )}

          <div className="flex items-center justify-end mt-4">
            <button
              type="button"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 underline cursor-pointer"
              onClick={toggleRecovery}
            >
              {recovery ? 'Use an authentication code' : 'Use a recovery code'}
            </button>

            <PrimaryButton
              className={classNames('ml-4', { 'opacity-25': form.processing })}
              disabled={form.processing}
            >
              Log in
            </PrimaryButton>
          </div>
        </form>
      </AuthenticationCard>
*/}
    </LoginLayout>
  );
}
