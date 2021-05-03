import { Container } from '@material-ui/core';
import PropTypes from 'prop-types';
import Header from './Header';
import Nav from './Nav';
import Cart from './Cart';

export default function Page({ children }) {
  return (
    <>
      {/* <Container> */}
      <Nav />
      {/* <Header /> */}
      {/* </Container> */}
      <Container maxWidth="md" style={{ marginTop: 10 }}>
        <Cart />
        {children}
      </Container>
    </>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
