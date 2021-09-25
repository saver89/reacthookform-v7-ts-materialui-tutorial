/* eslint-disable react/jsx-props-no-spreading */
// index.tsx
import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Head from 'next/head';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import * as yup from 'yup';
import FormInput from '@src/components/FormInput';
import styles from '../styles/Home.module.css';

interface IFormInputs {
  email: string;
  password: string;
}

const schema: yup.SchemaOf<IFormInputs> = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required().min(4),
});

const Home: FC = () => {
  const methods = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const FormSubmitHandler: SubmitHandler<IFormInputs> = (data: IFormInputs) => {
    console.log('form data', data);
  };

  console.log('email', methods.watch('email'));

  return (
    <div className={styles.container}>
      <Head>
        <title>ReceitaClient</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(FormSubmitHandler)}>
            <FormInput name="email" defaultValue="test@test" label="Email" type="email" />
            <br />
            <br />
            <FormInput name="password" defaultValue="" label="Password" type="password" />
            <br />
            <br />
            <input type="submit" />
          </form>
        </FormProvider>
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
