module.exports = ({ content }) => {
    
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Shop</title>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/js/all.min.js">
                <link rel="stylesheet" href="/assets/style.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.2/css/bulma.css">
                <script src="https://kit.fontawesome.com/cf72265632.js" crossorigin="anonymous"></script>

            </head>
            <body class="admin">
             <header>
                <nav class="navbar navbar-bottom">
                    <div class="container navbar-container">
                        <div>
                            <a href="/admin">
                             <h3 class="title">Admin Panel</h3>
                            </a>
                        </div>
                        <div class="navbar-item">
                            <div class="navbar-buttons">
                            <div class="navbar-item">
                                <a href="/admin"><i class="fas fa-star"></i>Products</a>
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
}