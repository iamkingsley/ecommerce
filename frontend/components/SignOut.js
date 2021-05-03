import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { useRouter } from 'next/dist/client/router';
import Button from '@material-ui/core/Button';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();

  async function handleSignOut(e) {
    e.preventDefault(); // stop the form from submitting
    const res = await signout();
    if (res) {
      router.push({
        pathname: '/signin',
      });
    }
  }
  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
