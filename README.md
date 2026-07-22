# Simple Tools

A lightweight and practical collection of online web tools. The project is built with vanilla HTML, CSS, and JavaScript, requiring no backend services or build tools. Simply clone the repository to run it locally.

## Tools List

- **Steam Market Ratio Calculator**：Calculates Steam Market sale proceeds, transaction fees, and listing price ratios.
- **WIDE Evo Print Quality Unlock**：Processes photos locally in the browser and generates files suitable for printing from a WIDE Evo TF card.
- **iRacing Safety Rating Risk Estimator**：Estimates Safety Rating risk based on licence class, session type, number of laps, and incident points.
- **iRacing iRating Calculator**：Estimates post-race iRating changes from the class field's ratings and final classification using the common community Elo approximation.
- **Base64 Encoder & Decoder**：Encodes and decodes Base64 text locally in the browser.

## Running Locally

```bash
git clone https://github.com/Moskic/simple-tools.git
cd simple-tools
python3 -m http.server 8000
```

Then open the following address in your browser:

```text
http://localhost:8000
```

You can also open the `index.html`，file in the root directory directly, but using a local HTTP server helps avoid certain browser restrictions on local files.

## Project Structure

```text
simple-tools/
├── index.html
├── styles.css
├── tools.js
├── steam_ratio_calculator/
├── wide_evo_print_quality_unlock/
├── iracing_safety_rating_estimator/
├── iracing_irating_calculator/
└── base64_encode_decode/
```

## Adding a New Tool

1. Create a separate folder for the new tool in the root directory.
2. Add the required `index.html`, stylesheet, and script files.
3. Add the tool’s name, description, and path to the `tools` array in `tools.js`.

## Notes

Some pages load icons or third-party libraries through a CDN, so an internet connection may be required for certain features. All calculation results are for reference only and should be verified according to your actual needs.
