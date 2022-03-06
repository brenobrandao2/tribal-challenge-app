import { QueryClient, QueryClientProvider } from 'react-query';
import Routes from './src/components/routes/Routes';

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}