import axios from "axios";
import { useState } from "react";
import BackgroundImage from '../src/background.jpeg';
import "./App.css";
import { Box, Button, Grid, Paper, Skeleton } from "@mui/material";

function App() {
  // Declare a new state variable, which we'll call "villager"
  const [villager, setVillager] = useState<undefined | any>(undefined);
  const [villagerName, setVillagerName] = useState<undefined | any>(undefined);

  const BASE_API_URL = "https://acnhapi.com/v1/villagers/";

  const styles = {
    paperContainer: {
        backgroundImage: `url(${BackgroundImage})`,
        height: '100vh',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
    }
};

  

  return (
    <div style={styles.paperContainer}>
      <h1 style={{ display: "flex", paddingTop: '30px', justifyContent: "center" , textAlign: "center"}}>Animal Crossing Villagers</h1>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="contained" onClick={search}>New Villager</Button>
      </div>

      {villager === undefined ? (
        <div></div>
      ) : (
        <div
          id="villager-result"
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "75px 10px 0px 10px",
          }}
        >
          <Paper sx={{ backgroundColor: villager["bubble-color"], color: villager["text-color"] }}>
            <Grid
              container
              direction="column"
              spacing={5}
              sx={{
                justifyContent: "center",
              }}
            >

              <Grid item sx={{display: "flex", justifyContent: "center"}}>
                <Box>
                  {villager["image_uri"] ? (
                    <img
                      height="200px"
                      width="200px"
                      alt={villagerName}
                      src={villager["image_uri"]}
                      style = {{borderRadius: 100}}
                    ></img>
                  ) : (
                    <Skeleton width={200} height={200} />
                  )}
                </Box>
              </Grid>

              <Grid item sx={{display: "flex", justifyContent: "center", paddingBottom: 5, textAlign: "center"}}>
                <Box>
                  {villager === undefined || villager === null ? (
                    ""
                  ) : (
                    <div>
                      <h1>{villagerName}</h1>
                      <p>
                        ID: {villager["id"]}
                        <br />
                        Species: {villager["species"]}
                        <br />
                        Gender: {villager["gender"]}
                        <br />
                        Birthday: {villager["birthday-string"]}
                        <br />
                        Personality: {villager["personality"]}
                        <br />
                        Hobby: {villager["hobby"]}
                        <br />
                        Catch phrase: {villager["catch-phrase"]}
                        <br />
                        Saying: {villager["saying"]}
                      </p>
                    </div>
                  )}
                </Box>
              </Grid>
              
            </Grid>
          </Paper>
          </div>
      )}
    </div>
  );

  function search() {
    // Generate a random villager id
    const id = Math.floor(Math.random() * 391) + 1;

    // console.log(BASE_API_URL + id) 
    axios.get(BASE_API_URL + id).then((res) => {
      setVillager(res.data);
      setVillagerName(res.data.name["name-USen"]);
      // console.log(res.data);
    });
  }
}

export default App;