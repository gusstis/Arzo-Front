
// This gets called on every request
export async function getServerSideProps() {

    const res = await fetch(process.env.devUrl+`/api/church`)
    const data = await res.json()
    
    console.log("data:==========",data)
    return { props: { data } }
  }
  
