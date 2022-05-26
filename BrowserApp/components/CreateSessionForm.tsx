import { Button, Input } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

export function CreateSessionForm({ callback }) {
  const { register, handleSubmit, reset } = useForm({ mode: 'onSubmit' });

  const createSession = async (data) => {
    await callback({ variables: data });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(createSession)}>
      <Input {...register('description', { required: true })} />
      <Button type="submit">Create</Button>
    </form>
  );
}
