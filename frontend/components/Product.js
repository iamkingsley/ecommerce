import React from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddToCart from './AddToCart';
import DeleteProduct from './DeleteProduct';
import formatMoney from '../lib/formatMoney';

const useStyles = makeStyles({
  root: {
    // maxWidth: 345,
  },
});

export default function Product({ product }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card className={classes.root}>
        <Link href={`/product/${product.id}`}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt={product.name}
              height="140"
              image={product?.photo?.image?.publicUrlTransformed}
              title={product.name}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h6"
                component="h2"
                color="textPrimary"
              >
                {product.name}
                <span style={{ float: 'right' }}>
                  {formatMoney(product.price)}
                </span>
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {product.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions>
          <Button color="primary" startIcon={<EditIcon />}>
            <Link
              href={{
                pathname: '/update',
                query: {
                  id: product.id,
                },
              }}
              color="primary"
            >
              Edit
            </Link>
          </Button>
          <AddToCart id={product.id} />
          <DeleteProduct id={product.id}>Delete</DeleteProduct>
        </CardActions>
      </Card>
    </Grid>
  );
}
