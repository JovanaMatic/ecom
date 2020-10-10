module.exports = ({ content }) => {
    return `
      <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Shop</title>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
          <script src="https://kit.fontawesome.com/cf72265632.js" crossorigin="anonymous"></script>
          <link href="/assets/style.css" rel="stylesheet">
        </head>
  
        <body>
          <header>
            <nav class="navbar-top">
              <div class="container-one">
                <div>
                  <ul class="social01">
                    <li>
                      <a href=""><i class="fa fa-phone"></i><span>+1 555 987 6543</span></a>
                    </li>
                    <li>
                      <a href=""><i class="fa fa-envelope"></i><span> shop@myshop.com</span></a>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul class="social">
                    <li><a href=""><i class="fab fa-facebook"></i></a></li>
                    <li><a href=""><i class="fab fa-twitter"></i></a></li>
                    <li><a href=""><i class="fab fa-linkedin"></i></a></li>
                    <li><a href=""><i class="fab fa-dribbble"></i></a></li>
                    <li><a href=""><i class="fab fa-google-plus"></i></a></li>
                  </ul>
                </div>
              </div>
            </nav>
            <nav class="navbar-bottom">
              <div class="container-02">
                <div>
                  <a href="/">
                    <h3 class="title">EComm Shop</h3>
                  </a>
                </div>
                <div class="navbar-item">
                  <div class="navbar-buttons">
                    <div class="navbar-item">
                      <a href="/"><i class="fa fa-star"></i><span> Products</span></a>
                    </div>
                    <div class="navbar-item">
                      <a href="/cart"><i class="fa fa-shopping-cart"></i><span> Cart</span></a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
  
          ${content}
        </body>
      </html>
    `;
  };
  