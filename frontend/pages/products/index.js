import { useRouter } from 'next/dist/client/router';
import Box from '@material-ui/core/Box';
import Pagination from '../../components/Pagination';
import Products from '../../components/Products';

export default function ProductsPage() {
  const { query } = useRouter();
  const page = parseInt(query.page);
  return (
    <Box marginTop={3}>
      {/* <Pagination page={page || 1} /> */}
      <Products page={page || 1} />
      <Pagination page={page || 1} />
    </Box>
  );
}
