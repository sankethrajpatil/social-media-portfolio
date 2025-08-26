# Social Media Portfolio

This project is a simple social media portfolio that allows users to embed posts from Instagram, Facebook, and LinkedIn. It is designed to showcase your social media presence in a clean and organized manner.

## Project Structure

```
social-media-portfolio
├── src
│   ├── index.html          # Main HTML document
│   ├── styles
│   │   └── main.css       # CSS styles for the portfolio
│   ├── scripts
│   │   ├── embed.js       # JavaScript for embedding social media posts
│   │   └── utils.js       # Utility functions for the project
│   └── components
│       └── embed-block.html # Reusable HTML block for embedding posts
└── README.md              # Project documentation
```

## Getting Started

To get started with this project, follow these steps:

1. **Clone the repository** to your local machine using:
   ```
   git clone <repository-url>
   ```

2. **Navigate to the project directory**:
   ```
   cd social-media-portfolio
   ```

3. **Open the `src/index.html` file** in your web browser to view the portfolio.

## Usage

To embed a social media post, you can use the reusable block of code found in `src/components/embed-block.html`. Simply replace the placeholder URL with the link to the post you want to embed.

### Example

```html
<!-- Example of using the embed block -->
<div class="embed-container">
    <!-- Replace 'YOUR_POST_URL' with the actual URL -->
    <script src="src/scripts/embed.js"></script>
    <div class="embed-block" data-url="YOUR_POST_URL"></div>
</div>
```

## Requirements

- A modern web browser to view the portfolio.
- Basic knowledge of HTML, CSS, and JavaScript for customization.

## License

This project is open-source and available under the MIT License. Feel free to modify and use it as you wish!