import { signOut } from '../components/Auth/signout';

const SignOutButton = () => {
  return (
    <button onClick={signOut}>
      サインアウト
    </button>
  );
};

export default SignOutButton;
