import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Typography } from '@material-ui/core';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation REMOVE_FROM_CART_MUTATION($id: ID!) {
    deleteCartItem(id: $id) {
      id
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteCartItem));
}

export default function RemoveFromCart({ id }) {
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    update,
    // optimisticResponse: {
    //   deleteCartItem: {
    //     __typename: 'CartItem',
    //     id,
    //   },
    // },
  });
  return (
    <Button
      color="primary"
      onClick={removeFromCart}
      disabled={loading}
      type="button"
      title="Remove This Item from Cart"
    >
      <Typography variant="h5">&times;</Typography>
    </Button>
  );
}
