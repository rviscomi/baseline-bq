# baseline-bq

Generates newline-delimited JSON files for easy importing into BigQuery

1. Install or update dependencies

    1. Install dependencies

        ```sh
        npm install
        ```

    2. Ensure the `web-features` dependency is up to date

        ```sh
        npm run update
        ```

2. Run the JSON generation script

    ```sh
    npm run start
    ```

3. Upload the data to BigQuery

    1. Navigate to your project on [BigQuery](https://console.cloud.google.com/bigquery)

    2. Create a new `baseline` dataset and use the three-dot menu on the dataset to select "Create table"
    
        - Create table from "Upload"
        - Select the `dist/features.jsonnl` file
        - Change file format to "JSONL (Newline delimited JSON)"
        - Set the table name to `features`
        - Edit the schema as text and paste the contents of `schema/features.json`
        - Click "Create table"
        - Select "View job" as the table is created to watch for any import errors
        - Repeat steps for `browser_releases`
