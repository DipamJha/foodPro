// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

// const ChatBot = () => {
//   const location = useLocation();
//   const product = location.state?.product;
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const GEMINI_API_KEY = 'AIzaSyCIgr_B2mIZgPSrOiLETDxaO8HsnDKCKSY';


// const sendToGemini = async (userInput) => {
//   const updatedMessages = [
//     ...messages,
//     { role: 'user', text: userInput }
//   ];
  
//   const contents = updatedMessages.map((msg) => ({
//     role: msg.role === 'user' ? 'user' : 'model',
//     parts: [{ text: msg.text }]
//   }));

//   try {
//     setLoading(true);

//     const response = await fetch(
//       `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ contents })
//       }
//     );

//     const data = await response.json();
//     const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '❌ No response';

//     setMessages([
//       ...updatedMessages,
//       { role: 'ai', text: aiText }
//     ]);
//   } catch (err) {
//     setMessages([
//       ...updatedMessages,
//       { role: 'ai', text: '❌ Error talking to Gemini.' }
//     ]);
//   } finally {
//     setLoading(false);
//     setInput('');
//   }
// };


//   // Step 1: Auto-run product analysis
//   useEffect(() => {
//     if (product) {
//       const analysisPrompt = `You are Food Scanner 🍽️ — a smart and friendly food analysis expert.  
// Here is a food item a user just scanned.  
// Please explain in **simple English** whether this food is healthy or not, and **why**.  

// Also:  
// - Compare it with 2–3 popular alternatives in the same category.  
// - Suggest the best option in a clean table format.  
// - Guess freshness and shelf life based on typical market knowledge and ingredients.  
// - If unhealthy, explain in one line why.  
// - Be casual, helpful, and easy to understand.  

// ---

// 🛍 Product: ${product.product_name}  
// 🥣 Ingredients: ${product.ingredients_text}  
// 📊 Nutrition Grade: ${product.nutrition_grades}  

// ---

// Please return a smooth report like a UI card with:  
// 1. 🔍 Health Summary  
// 2. 🥇 Alternatives (Table format)  
// 3. ⏳ Freshness & Shelf Life  
// 4. ✅ Final Verdict (and 1-line health tip)
// `;
//       sendToGemini(analysisPrompt, true);
//     }
//   }, [product]);

//   // Step 2: Handle chat input
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim()) sendToGemini(input.trim(), false);
//   };

//   return (
//     <div style={{ padding: '2rem', maxWidth: '700px', margin: 'auto' }}>
//       <h2>🤖 Food AI Product Chat</h2>
//       {product && (
//         <>
//           <p><strong>🛍 Product:</strong> {product.product_name}</p>
//           <p><strong>🥣 Ingredients:</strong> {product.ingredients_text}</p>
//           <p><strong>📊 Nutrition Grade:</strong> {product.nutrition_grades}</p>
//           <hr />
//         </>
//       )}
      

//       <div style={{
//         marginBottom: '1rem',
//         background: '#f7f7f7',
//         padding: '1rem',
//         height: '300px',
//         overflowY: 'auto',
//         border: '1px solid #ccc',
//         borderRadius: '8px'
//       }}>
//         {messages.map((msg, idx) => (
//           <p key={idx} style={{ color: msg.role === 'ai' ? '#000' : '#0077cc' }}>
//             <strong>{msg.role === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
//           </p>
//         ))}
//         {loading && <p><em>AI is thinking...</em></p>}
//       </div>

//       <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '1rem' }}>
//         <input
//           type="text"
//           value={input}
//           placeholder="Ask something about the product..."
//           onChange={(e) => setInput(e.target.value)}
//           style={{ flex: 1, padding: '0.5rem' }}
//         />
//         <button type="submit" disabled={loading}>Send</button>
//       </form>
//     </div>
//   );
// };

// export default ChatBot;

import ReactMarkdown from 'react-markdown';

import { AlignHorizontalCenter, AlignVerticalCenter } from '@mui/icons-material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const floatAnimation = {
  animation: 'float 3s ease-in-out infinite'
};

// Inject keyframes into the page
const keyframes = `
@keyframes float {
  0% { transform: translateY(-50%) translateY(0); }
  50% { transform: translateY(-50%) translateY(-10px); }
  100% { transform: translateY(-50%) translateY(0); }
}`;

const styleEl = document.createElement("style");
document.head.appendChild(styleEl);
const mySheet = styleEl.sheet;

try {
  mySheet.insertRule(keyframes, mySheet.cssRules.length);
} catch (e) {
  console.warn("⚠️ Failed to insert rule:", e.message);
}

  
  
const ChatBot = () => {
const keywords = [
        { label: "🩺 Diabetes", query: "Is this product safe for someone with diabetes?" },
        { label: "❤️ Heart Health", query: "Is this product good for heart health?" },
        { label: "⚡ Energy Boost", query: "Does this product give energy or is it heavy?" },
        { label: "🧠 Brain Focus", query: "Is this product good for brain and focus?" }
      ];
      
  const location = useLocation();
  const product = location.state?.product;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const GEMINI_API_KEY = 'AIzaSyCIgr_B2mIZgPSrOiLETDxaO8HsnDKCKSY';
  // const GEMINI_API_KEY ='';
  const sendToGemini = async (userInput) => {
    const updatedMessages = [
      ...messages,
      { role: 'user', text: userInput }
    ];

    const contents = updatedMessages.map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    try {
      setLoading(true);

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents })
        }
      );

      const data = await response.json();
      const aiText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '❌ No response';

      setMessages([...updatedMessages, { role: 'ai', text: aiText }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'ai', text: '❌ Error talking to Gemini.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  useEffect(() => {
    if (product) {
      const analysisPrompt = `You are Food Scanner 🍽️ — a smart food health expert.

A user scanned the following product:

🛍 Product: ${product.product_name}  
🥣 Ingredients: ${product.ingredients_text}  
📊 Nutrition Grade: ${product.nutrition_grades}  

Give a clean, Morder report:

1. 🔍 Is it healthy or not? Say why in 1 line.  
2. 🥇  Just tell which one is healtier and why?
3. ⏳ Estimate freshness & shelf life to do it give a rough guess dont show that it is rough guess just like that tell it.  
4. ✅ Final verdict: Is it safe for daily use? Add 1 health tip .  
Keep it short, casual, and udont go in depth expalaination color of text should be dark.
`;

      sendToGemini(analysisPrompt, true);
    }
  }, [product]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) sendToGemini(input.trim(), false);
  };

  return (
    <div style={styles.centerWrapper}>
    {/* Left Image (Fridge Open) */}
{/* Left Fridge */}
{/* Left Fridge (centered vertically) */}
<img
  src="/fridge-open.png"
  alt="Fridge Open"
  style={{
    position: 'absolute',
    left: '80px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '200px',
    objectFit: 'contain',
    zIndex: 0,
    opacity: 0.9,
    ...floatAnimation
  }}
/>


{/* Right Fridge (centered vertically) */}
<img
  src="/fridge-closed.png"
  alt="Fridge Close"
  style={{
    position: 'absolute',
    right: '80px',
    top: '50%',
    transform: 'translateY(-50%)',
    height: '200px',
    objectFit: 'contain',
    zIndex: 0,
    opacity: 0.9,
    ...floatAnimation
  }}
/>





    <div style={styles.container}>
       
      <h2 style={styles.header}>🥗 Food AI Product Chat</h2>
      {product && (
        <div style={styles.productCard}>
          <p>  <img
      src={product.image_url}
      alt={product.product_name}
      style={{
        width: '100px',
        height: '100px',
        objectFit: 'contain'
      }} />
      </p>
        
        </div>
      )}
     

      <div style={{ ...styles.chatBox, display: 'flex', flexDirection: 'column' }}>
      {messages.map((msg, idx) => (
  <div key={idx} style={msg.role === 'ai' ? styles.aiBubble : styles.userBubble}>
    <strong>{msg.role === 'ai' ? 'AI:' : 'You:'}</strong>
    <ReactMarkdown
  components={{
    p: ({node, ...props}) => <p style={{ color: '#fff' }} {...props} />,
    strong: ({node, ...props}) => <strong style={{ color: '#fff' }} {...props} />,
    li: ({node, ...props}) => <li style={{ color: '#fff' }} {...props} />
  }}
>
  {msg.text}
</ReactMarkdown>

  </div>
))}
{loading && <p style={{ fontStyle: 'italic', margin: '0.5rem' }}>🤖 AI is thinking...</p>}
</div>

<div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}
>
  {keywords.map((item, idx) => (
    <button
      key={idx}
      onClick={() => sendToGemini(item.query)}
      style={{
        background: '#dcedc8',
  color: '#33691e',
  padding: '0.5rem 1rem',
  border: 'none',
  borderRadius: '20px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
}}
onMouseOver={(e) => e.currentTarget.style.background = '#c8e6c9'}
onMouseOut={(e) => e.currentTarget.style.background = '#dcedc8'}
      
    >
      {item.label}
    </button>
  ))}
</div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={input}
          placeholder="Ask something about the product..."
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button type="submit" disabled={loading} style={styles.button}>
          🍏 Send
        </button>
      </form>
    </div>
    </div> 
  );
};

const styles = {
 centerWrapper: {
  position: 'relative', // 🔑 important for absolute positioning
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: '2rem',
  backgroundImage: 'url("/background.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  overflow: 'hidden'
},




  
    container: {
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#fff9f1',
      padding: '2rem',
      maxWidth: '720px',
      margin: 'auto',
      borderRadius: '16px',
      marginTop:'6.2rem',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    header: {
      textAlign: 'center',
      fontSize: '1.8rem',
      marginBottom: '5rem',
      fontWeight: 'bold',
      color: '#2e7d32',
      marginTop:'4rem'
      
    },
  productCard: {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '2rem'
},

    chatBox: {
  background: '#fff',          // still white background
  color: '#000',               // 👈 change to white (#fff) only if background is dark
  padding: '1rem',
  height: '360px',
  overflowY: 'auto',
  borderRadius: '12px',
  border: '1px solid #ddd',
  marginBottom: '1rem'
},

   userBubble: {
  background: '#dcedc8',
  alignSelf: 'flex-end',
  margin: '0.5rem 0',
  padding: '0.75rem 1rem',
  borderRadius: '20px 20px 0 20px',
  maxWidth: '80%',
  color: '#1b1b1b' // 👈 dark text
},

aiBubble: {
  background: '#2c2c2c	',
  alignSelf: 'flex-start',
  margin: '0.5rem 0',
  padding: '0.75rem 1rem',
  borderRadius: '20px 20px 20px 0',
  maxWidth: '80%',
  color: '#1b1b1b' // 👈 dark text
},

    form: {
      display: 'flex',
      gap: '1rem',
      marginTop: '1rem'
    },
    input: {
      flex: 1,
      padding: '0.75rem 1rem',
      borderRadius: '10px',
      border: '1px solid #ccc',
      fontSize: '1rem'
    },
    button: {
      backgroundColor: '#66bb6a',
      color: 'white',
      padding: '0.75rem 1.5rem',
      borderRadius: '10px',
      fontWeight: 'bold',
      border: 'none',
      cursor: 'pointer',
      fontSize: '1rem'
    }
  };
  
export default ChatBot;
