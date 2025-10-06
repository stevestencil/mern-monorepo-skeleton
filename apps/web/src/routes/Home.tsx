import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';

type User = { _id: string; email: string; name: string };

export default function Home() {
  const qc = useQueryClient();
  const users = useQuery<User[]>({ queryKey: ['users'], queryFn: () => api('/users') });
  const add = useMutation({
    mutationFn: (u: Omit<User, '_id'>) => api<User>('/users', { method: 'POST', body: JSON.stringify(u) }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] })
  });

  return (
    <div>
      <button onClick={() => add.mutate({ email: `user${Date.now()}@x.com`, name: 'Test' })}>Add User</button>
      <pre>{JSON.stringify(users.data ?? [], null, 2)}</pre>
    </div>
  );
}