import { LoginEmailContent } from 'shared/components/LoginEmailContent';
import { Logo } from 'shared/components/Logo';

import { DesktopLink } from 'desktop/components/DesktopLink';
import { Layout } from 'desktop/components/Layout';
import { LayoutHeader } from 'desktop/components/LayoutHeader';
import { loginEmail } from 'desktop/routes/loginEmail';

function LoginEmail() {
  const { email, token } = loginEmail.useSearch();

  return (
    <Layout header={<LayoutHeader left={<DesktopLink to="/"><Logo p="2" /></DesktopLink>} />}>
      <LoginEmailContent email={email} token={token} />
    </Layout>
  );
}

export default LoginEmail;
