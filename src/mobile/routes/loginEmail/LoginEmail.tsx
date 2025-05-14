import { LoginEmailContent } from 'shared/components/LoginEmailContent';
import { Logo } from 'shared/components/Logo';

import { Layout } from 'mobile/components/Layout';
import { LayoutHeader } from 'mobile/components/LayoutHeader';
import { MobileLink } from 'mobile/components/MobileLink';
import { loginEmail } from 'mobile/routes/loginEmail';

function LoginEmail() {
  const { email, token } = loginEmail.useSearch();

  return (
    <Layout header={<LayoutHeader left={<MobileLink to="/"><Logo p="2" /></MobileLink>} />}>
      <LoginEmailContent email={email} token={token} />
    </Layout>
  );
}

export default LoginEmail;
