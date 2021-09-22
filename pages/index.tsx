/* eslint-disable react/jsx-props-no-spreading */
// index.tsx
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import styles from '../styles/Home.module.css';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Home: FC = () => {
  const {
    register,
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
          <input defaultValue="user@test.com" {...register('email')} />
          <br />
          <br />
          <input {...register('password', { required: true })} />
          <br />
          {errors.password && <span>Password required</span>}
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
