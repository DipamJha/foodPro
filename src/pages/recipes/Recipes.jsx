import { useState } from 'react';
import axios from 'axios';
import './recipes.css';
import BarcodeScanner from '../scanner/Scanner.tsx';
import { useNavigate } from 'react-router-dom';

const Recipes = () => {
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const navigate = useNavigate();

  const fetchProductDetails = async (barcode) => {
    try {
      // Using a proxy URL to avoid SSL certificate issues
      const response = await axios.get(`https://openfoodfacts.org/api/v2/product/${barcode}`, {
        headers: {
          'User-Agent': 'FoodScan - React Web App',
        }
      });
      
      if (response.data && response.data.product) {
        setProduct(response.data.product);
        setError('');
      } else {
        setProduct(null);
        setError('Product not found.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setProduct(null);
      setError('Failed to fetch product. Please try scanning again.');
    }
  };

  const handleBarcodeDetected = (barcode) => {
    setScannedBarcode(barcode);
    fetchProductDetails(barcode);
  };
  
  const handleAnalyze = () => {
    if (!product) return;
    navigate('/chatbot', { state: { product } });
  };

  return (
    <div className="bg">
      <div className="ingredients1">
        <table className="ingredient">
          <thead>
            <tr><th className="pixely">Upload Image to Scan</th></tr>
          </thead>
          <tbody>
            <tr>
              <td><BarcodeScanner onDetected={handleBarcodeDetected} /></td>
            </tr>
            {scannedBarcode && (
              <tr><td><strong>Scanned Barcode:</strong> {scannedBarcode}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="ingredients2">
        <table className="recipes">
          <thead>
            <tr><th className="pixely">Product Info</th></tr>
          </thead>
          <tbody>
            {product ? (
              <>
                <tr><td><strong>Name:</strong> {product.product_name}</td></tr>
                <tr><td><strong>Brand:</strong> {product.brands}</td></tr>
                <tr><td><strong>Ingredients:</strong> {product.ingredients_text || 'N/A'}</td></tr>
                <tr><td><strong>Categories:</strong> {product.categories}</td></tr>
                <tr><td><strong>Nutrition Grade:</strong> {product.nutrition_grades}</td></tr>
                <tr><td><img src={product.image_url} alt={product.product_name} width="120" /></td></tr>
                <tr><td>
                  <button className="analyze-btn" onClick={handleAnalyze}>
                    🔍 Analyze
                  </button>
                </td></tr>
              </>
            ) : (
              <tr><td>{error || 'Upload an image to scan a barcode.'}</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Recipes;