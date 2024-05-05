export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: "/all",
      permanent: true,
    },
  };
};

export default function HomePage() {
  return <></>;
}
