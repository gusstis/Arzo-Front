import { Input, Spacer } from '@nextui-org/react';
import { Button, Grid } from '@nextui-org/react';
import { Fragment } from 'react';
import styles from '/styles/Crud.module.css';

export default function Parroquias() {
  return (
    <div className={styles.centerblock}>
      <h1>Crear Nueva Parroquia</h1>
      <Spacer y={2.5} />
      <Input clearable underlined labelPlaceholder="Nombre" />
      <Spacer y={1.5} />
      <Input clearable underlined labelPlaceholder="Direccion" />
      <Spacer y={1.5} />
      <Input clearable underlined labelPlaceholder="Codigo Postal" />
      <Spacer y={1.5} />

      <div className={styles.centerblockflex}>
        <Button color="error" auto className={styles.btn1}>
          Cancelar
        </Button>
        <Button color="primary" auto className={styles.btn1}>
          Crear
        </Button>
      </div>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  const res = await fetch(process.env.devUrl + `/pages/api/sacerdote`);
  const data = await res.json();

  console.log('data:==========', data);
  return { props: { data } };
}
