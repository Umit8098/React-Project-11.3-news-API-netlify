export const handler = async (event) => {

  const API_KEY = process.env.NEWS_API_KEY;


  const { category = "technology", q = "" } = event.queryStringParameters;

  const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&q=${q}&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Server error", error }),
    };
  }
};
