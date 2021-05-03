import { useState } from 'react';
import nProgress from 'nprogress';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useCart } from '../lib/cartState';
import { CURRENT_USER_QUERY } from './User';

const CREATE_ORDER_MUTATION = gql`
  mutation {
    checkout {
      id
      total
      items {
        id
        name
      }
    }
  }
`;

function Checkout() {
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { closeCart } = useCart();
  const [checkout, { error: graphQLError }] = useMutation(
    CREATE_ORDER_MUTATION,
    {
      refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );
  async function handleSubmit(e) {
    // 1. Stop the form from submitting and turn the loader one
    e.preventDefault();
    setLoading(true);
    console.log('We gotta do some work..');
    // 2. Start the page transition
    nProgress.start();
    // 3. Create the Order via a custom mutation!
    const order = await checkout();
    console.log(order);
    // 4. Change the page to view the order
    router.push({
      pathname: `/order/[id]`,
      query: {
        id: order.data.checkout.id,
      },
    });
    // 5. Close the cart
    closeCart();

    // 6. turn the loader off
    setLoading(false);
    nProgress.done();
  }

  return (
    <Grid
      xs={12}
      container
      spacing={2}
      style={{
        // boxShadow: '0 1px 2px 2px rgba(0, 0, 0, 0.04)',
        // border: '1px solid rgba(0, 0, 0, 0.06)',
        // borderRadius: '5px',
        padding: '1rem',
      }}
    >
      <form onSubmit={handleSubmit}>
        {error && <p style={{ fontSize: 12 }}>{error.message}</p>}
        {graphQLError && <p style={{ fontSize: 12 }}>{graphQLError.message}</p>}
        <Button color="primary">Check Out Now</Button>
      </form>
    </Grid>
  );
}

export { Checkout };
