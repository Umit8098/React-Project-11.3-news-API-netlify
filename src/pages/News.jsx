import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardMedia } from "@mui/material";


import { useEffect, } from "react";
// redux
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, setCategory } from "../features/newsSlice";

import loadingGif from "../assets/loading.gif";
import Header from "../components/Header";


const News = () => {
  const dispatch = useDispatch();

  const { newsList, loading, error, category, search } = useSelector((state) => state.news);
  
  // Redux'taki kategori değişince API çağrısı yapılır
  // 👉 API çağrısı hem CATEGORY hem SEARCH değişince yapılır!
  useEffect(() => {
    dispatch(fetchNews({ category, search }));
  }, [dispatch, category, search]); // category, search değiştiğinde tetiklenir


  return (
    <>
    <Header />
    <Box
      display="flex"
      justifyContent="center"
      mt={4}
      flexDirection={"column"}
      alignItems="center"   
    >
      {/* LOADING (sayfayı kaplamaz, sadece içerikte gösterilir) */}
        {loading && (
          <img
            src={loadingGif}
            width="200px"
            alt="Loading..."
            style={{ marginTop: 40 }}
          />
        )}

        {/* ERROR (sayfayı kapatmaz, kullanıcı kategori değiştirmeye devam eder) */}
        {error && (
          <Typography
            variant="h6"
            color="error"
            textAlign="center"
            mt={4}
          >
            {error}
          </Typography>
        )}

      {/* HABER LİSTESİ */}
      {/* {[1, 2, 3, 4].map((item, index) => ( */}
      {!loading && !error && (
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="space-evenly"
          flexWrap="wrap"
          width="100%"
        >
            {newsList?.map((item, index) => (

              <Card sx={{ maxWidth: 345, m: 5 }} key={index}>
                <CardMedia
                  component="img"
                  height="250"
                  image={
                    item?.urlToImage ??
                    "https://ichef.bbci.co.uk/news/976/cpsprodpb/5A8B/production/_122497132_tesla.png"
                  }
                  alt="img"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.title ?? "Tesla disables gaming while driving feature"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.description ??
                      "It follows an inquiry into Passenger Play, which allowed games to be played while a car was moving."}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" href={item?.url} target="_blank">
                    Detail
                  </Button>
                </CardActions>
              </Card>
            ))}
      </Box>
      )}
    </Box>
    </>
  );
};

export default News;