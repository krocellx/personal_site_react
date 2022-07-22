import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';
import Charts from './components/Charts';
import StockSearch from './components/StockSearch';
import Sidebar from './components/Sidebar';
import { Container, Row, Col } from 'react-bootstrap';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';
const WEB_URL = process.env.REACT_APP_WEB_URL || 'http://localhost:3000/';

function App() {
  const [word, setWord] = useState('');
  const [ticker, setTicker] = useState('');
  const [histPrice, setHistPrice] = useState({ symbol: 'empty' });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  setInterval(() => {
    axios.get(`${WEB_URL}`);
  }, 25 * 60 * 1000);

  useEffect(() => {
    async function getSavedImages() {
      try {
        const res = await axios.get(`${API_URL}/images`);
        setImages(res.data || []);
        setLoading(false);
        toast.success('Saved images downloaded');
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/?query=${word}`);
      console.log(res.data);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New image ${word} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };
  const handleStockSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/stock_price?ticker=${ticker}`);
      console.log(res.data);
      setHistPrice(res.data);
      toast.info(`Stock ${ticker} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setTicker('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warning(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      {/* <Header title="Personal Site" /> */}
      <Router>
        <Sidebar title="Personal Site" />
      </Router>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          /> */}
          <StockSearch
            ticker={ticker}
            setTicker={setTicker}
            handleSubmit={handleStockSearchSubmit}
          />
          {/* <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container> */}
          <Container className="mt-4">
            {histPrice.symbol !== 'empty' ? (
              <Charts data={histPrice} />
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default App;
