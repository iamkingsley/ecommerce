import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { List, ListItem, Grid, Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Checkout } from './Checkout';
import RemoveFromCart from './RemoveFromCart';
import { useCart } from '../lib/cartState';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useUser } from './User';
import formatMoney from '../lib/formatMoney';

const useStyles = makeStyles({
  list: {
    width: 400,
    paddingLeft: 10,
    paddingRight: 10,
  },
  fullList: {
    width: 'auto',
  },
});

export default function Cart() {
  const classes = useStyles();
  const me = useUser();
  const { cartOpen, closeCart, toggleCart } = useCart();

  if (!me) return null;
  return (
    <div>
      <Drawer anchor="right" open={cartOpen} onClose={closeCart}>
        <div
          className={clsx(classes.list, {
            // [classes.fullList]: anchor === 'top' || anchor === 'bottom',
          })}
          role="presentation"
          // onClick={toggleCart}
          onKeyDown={toggleCart}
        >
          <Grid container justify="flex-start">
            <Button color="primary" onClick={closeCart}>
              <Typography variant="h5">&times;</Typography>
            </Button>
            <Typography color="primary" variant="h6" style={{ marginTop: 5 }}>
              Your Cart
            </Typography>
          </Grid>
          <List>
            {me.cart.map((cartItem) => (
              <ListItem button key={cartItem.id}>
                <Grid container>
                  <Grid item sm>
                    <img
                      style={{ width: 100, marginRight: '1rem' }}
                      src={cartItem.product?.photo?.image?.publicUrlTransformed}
                      alt={cartItem.product.name}
                    />
                  </Grid>
                  <Grid item sm>
                    <h3>{cartItem.product.name}</h3>
                    <p>
                      {formatMoney(cartItem.product.price * cartItem.quantity)}-
                      <em>
                        {cartItem.quantity} &times;{' '}
                        {formatMoney(cartItem.product.price)} each
                      </em>
                    </p>
                  </Grid>
                  <RemoveFromCart id={cartItem.id} />
                </Grid>
              </ListItem>
            ))}
          </List>
          <p style={{ margin: 'auto', paddingLeft: 10, paddingRight: 10 }}>
            Total:
            <span style={{ float: 'right' }}>
              <Typography variant="h5" component="p">
                {formatMoney(calcTotalPrice(me.cart))}
              </Typography>
            </span>
          </p>
          {me.cart.length && <Checkout />}
        </div>
      </Drawer>
    </div>
  );
}
