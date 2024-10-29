import { Logo } from 'shared/components/Logo';
import { LoginEmailContent } from 'shared/modules/loginEmail/LoginEmailContent';

import { Layout, LayoutHeader } from 'mobile/components/Layout';
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
