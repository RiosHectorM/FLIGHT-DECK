import { auth } from '@/firebase';
import { signOut, User } from 'firebase/auth';
import { PrettyChatWindow } from 'react-chat-engine-pretty';

interface ChatProps {
  user: User;
}

export default function Page(props: ChatProps) {
  const userEmail = props.user?.email || '';

  return (
    <div style={{ height: '100vh', background: 'black' }}>
      <button className='button' onClick={() => signOut(auth)}>
        Sign Out
      </button>
      <PrettyChatWindow
        projectId={process.env.NEXT_PUBLIC_CHAT_ENGINE_PROJECT_ID || ''}
        username={userEmail}
        secret={props.user?.uid}
        style={{ height: '100%' }}
      />
    </div>
  );
}
