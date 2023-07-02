import { Container } from '@chakra-ui/react';
import { Layout } from 'desktop/components/Layout';
import React from 'react';
import { LoginForm } from 'shared/components/forms/LoginForm';
import { useAppDispatch } from 'shared/store/hooks';
import { loginEmail, loginEmailWithCode } from 'shared/actions/auth';
import { loaderIds } from 'shared/constants/loaderIds';
import { useLoaders } from 'shared/modules/loaders/hooks/useLoaders';

function Home() {
  const dispatch = useAppDispatch();
  const isLoading = useLoaders([loaderIds.loginEmail, loaderIds.loginEmailWithCode]);
  const [step, setStep] = React.useState(1);

  const changeStep = React.useCallback((stepNum) => {
    setStep(stepNum);
  }, []);

  const handleSubmit = React.useCallback(async ({ email, code }) => {
    if (code && email) {
      await dispatch(loginEmailWithCode({ email, code }));
      return;
    }

    if (email) {
      console.log('email', email);

      try {
        const result = await dispatch(loginEmail(email));
        changeStep(2);
        console.log('result', result);
      } catch (e) {
        console.log('errorrr', e);
      }
    }
  }, [dispatch, changeStep]);

  return (
    <Layout>
      <Container pt="24" maxW="md">
        <LoginForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          onStepChange={changeStep}
          step={step}
        />
      </Container>
    </Layout>
  );
}

export default Home;
