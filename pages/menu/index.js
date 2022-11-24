import { Card, Grid, Row, Text } from "@nextui-org/react";

export default function Cards({data}) {
    return (
        <Grid.Container gap={2} justify="flex-start">
          {data.map((item, index) => (
            <Grid xs={6} sm={3} key={index}>
              <Card isPressable>
                <Card.Body css={{ p: 0 }}>
                  <Card.Image
                    src={item.imagen||"https://res.cloudinary.com/doh6fzrdq/image/upload/v1669309206/user4_shpc7b.jpg"}
                    objectFit="cover"
                    width="100%"
                    height={140}
                    alt={item.name+" "+item.lastname}
                  />
                </Card.Body>
                <Card.Footer css={{ justifyItems: "flex-start" }}>
                  <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{item.title}</Text>
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                      {item.name+" "+item.lastname}
                    </Text>
                    
<p>{item.nombramiento[0]}</p>
<p>fecha de creacion:{item.CreatedAt}</p>
                  </Row>
                </Card.Footer>
              </Card>
            </Grid>
          ))}
        </Grid.Container>
    
    );
  }

// This gets called on every request
export async function getServerSideProps() {

    const res = await fetch(`https://ec6a-200-114-98-6.sa.ngrok.io/api/sacerdote`)
    const data = await res.json()
    
    console.log("data:==========",data)
    return { props: { data } }
  }
  
