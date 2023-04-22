export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log(session);

  if (!session) {
    console.log('En /pages/index.js, exp const getServerSideProps => !session...');
    {
      return {
        redirect: {
          destination: '../components/login',
          permanent: false,
        },
      };
    }
  }
  console.log('Ya hay una session guardada..');
  return {
    props: {
      session,
    },
  };
};
export default authSession();
