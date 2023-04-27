//Importa Fuente de Google
import { Rubik } from 'next/font/google';

//Ventanas Modales para login/register
import RegisterModal from './components/Modals/LoguinRegister/RegisterModal';
import LoginModal from './components/Modals/LoguinRegister/LoginModal';

//Alertas de Logeo o registro
import ToasterProvider from './providers/ToasterProvider';

import Landing from './components/LandingPage/Landing';

//Setea parametros de Fuente de Google
const font = Rubik({
  subsets: ['latin'],
  weight: '400',
});

export default function Home() {
  return (
    <main className={font.className}>
      <ToasterProvider />
      <LoginModal />
      <RegisterModal />
      <Landing />
    </main>
  );
}
