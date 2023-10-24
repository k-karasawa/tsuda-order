import { signOut } from '../components/Auth/signout';

export const SignOutButton = () => {
  return (
    <button onClick={signOut}>
      サインアウト
    </button>
  );
};
