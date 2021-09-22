/* eslint-disable react/jsx-props-no-spreading */
// index.tsx
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField } from '@material-ui/core';
import Head from 'next/head';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(4),
});

const Home: FC = () => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const FormSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log('form data', data);
  };

  console.log('email', watch('email'));

  return (
    <div className={styles.container}>
      <Head>
        <title>ReceitaClient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <form onSubmit={handleSubmit(FormSubmitHandler)}>
          <Controller
            name="email"
            control={control}
            defaultValue="user@test.com"
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email ? errors.email?.message : ''}
                />
              );
            }}
          />
          <br />
          <br />
          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password ? errors.password?.message : ''}
                />
              );
            }}
          />
          <br />
          <span>{errors?.password?.message}</span>
          <br />
          <input type="submit" />
        </form>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
};

export default Home;
