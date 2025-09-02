const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const name = req.query.name || '';
  
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Happy Birthday!</title>
      <style>
          body {
              margin: 0;
              height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              background: linear-gradient(to right, #ff9a9e, #fad0c4);
              font-family: 'Arial', sans-serif;
              overflow: hidden;
          }

          .container {
              text-align: center;
              padding: 2rem;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 20px;
              backdrop-filter: blur(10px);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          }

          #birthday-message {
              font-size: 3rem;
              color: #fff;
              text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
              margin-bottom: 2rem;
          }

          .cake {
              position: relative;
              margin: 0 auto;
              width: 150px;
              height: 120px;
              cursor: pointer;
          }

          .cake-top {
              width: 150px;
              height: 40px;
              background: #f8d8a5;
              border-radius: 10px 10px 0 0;
          }

          .cake-middle {
              width: 170px;
              height: 40px;
              background: #f4b393;
              margin-left: -10px;
          }

          .cake-bottom {
              width: 190px;
              height: 40px;
              background: #e39e9e;
              margin-left: -20px;
              border-radius: 0 0 10px 10px;
          }

          .candle {
              position: absolute;
              width: 10px;
              height: 30px;
              background: #fff;
              top: -30px;
              left: 70px;
              transition: all 0.3s ease;
          }

          .candle::after {
              content: '';
              position: absolute;
              width: 16px;
              height: 16px;
              background: #ff9900;
              border-radius: 50%;
              top: -10px;
              left: -3px;
              box-shadow: 0 0 20px #ff9900;
              transition: all 0.3s ease;
          }

          .cake:hover .candle::after {
              transform: scale(1.2);
              box-shadow: 0 0 30px #ff5500;
          }

          .balloon {
              position: absolute;
              width: 30px;
              height: 40px;
              border-radius: 50%;
              animation: float 15s infinite ease-in-out;
          }

          .balloon:nth-child(1) { background: #ff6b6b; top: 10%; left: 10%; animation-delay: 0s; }
          .balloon:nth-child(2) { background: #4ecdc4; top: 20%; left: 80%; animation-delay: 2s; }
          .balloon:nth-child(3) { background: #ffbe0b; top: 70%; left: 15%; animation-delay: 4s; }
          .balloon:nth-child(4) { background: #8ac926; top: 60%; left: 85%; animation-delay: 6s; }

          @keyframes float {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-20px) rotate(5deg); }
          }

          .confetti {
              position: absolute;
              width: 10px;
              height: 10px;
              opacity: 0;
              animation: confetti-fall 5s infinite linear;
          }

          @keyframes confetti-fall {
              0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }

          @media (max-width: 768px) {
              #birthday-message {
                  font-size: 2rem;
              }
          }
      </style>
  </head>
  <body>
      <div class="balloon"></div>
      <div class="balloon"></div>
      <div class="balloon"></div>
      <div class="balloon"></div>

      <div class="container">
          <h1 id="birthday-message">Happy Birthday${name ? ', ' + name : ''}! 🎉</h1>
          <div class="cake" onclick="blowCandle()">
              <div class="cake-top"></div>
              <div class="cake-middle"></div>
              <div class="cake-bottom"></div>
              <div class="candle" id="candle"></div>
          </div>
          <p>Click on the cake to blow out the candle!</p>
      </div>

      <script>
          function createConfetti() {
              const colors = ['#ff6b6b', '#4ecdc4', '#ffbe0b', '#8ac926', '#6a0572', '#ab83a1'];
              for (let i = 0; i < 50; i++) {
                  const confetti = document.createElement('div');
                  confetti.className = 'confetti';
                  confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                  confetti.style.left = Math.random() * 100 + 'vw';
                  confetti.style.animationDelay = Math.random() * 5 + 's';
                  document.body.appendChild(confetti);
              }
          }

          function blowCandle() {
              const candle = document.getElementById('candle');
              const message = document.getElementById('birthday-message');
              
              candle.style.opacity = '0';
              message.textContent = 'Make a wish! 🎂';
              
              createConfetti();
              
              setTimeout(() => {
                  candle.style.opacity = '1';
                  const urlParams = new URLSearchParams(window.location.search);
                  const name = urlParams.get('name');
                  message.textContent = 'Happy Birthday' + (name ? ', ' + name : '') + '! 🎉';
              }, 3000);
          }

          createConfetti();
      </script>
  </body>
  </html>
  `;
  
  res.send(htmlContent);
});

app.listen(port, () => {
  console.log('🎉 Birthday server running!');
});
