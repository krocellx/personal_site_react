import pandas as pd
import yfinance as yf


class CustomIndex:
    def __init__(self):
        """
        Initializes the CustomIndex class with input data.

        :param data: A DataFrame with columns ['Date', 'Index', 'SyntheticTicker', 'UnderlyingTicker', 'Weight']
        """
        self.data = None
        self.returns = None
        self.ticker_data = None

    def load_data_from_csv(self, file_path):
        """
        Loads data from a CSV file into the DataFrame.

        :param file_path: Path to the CSV file.
        """
        self.data = pd.read_csv(file_path)
        self.data['Date'] = pd.to_datetime(self.data['Date'])  # Convert 'Date' to datetime format

    def fetch_ticker_data(self):
        """
        Fetches historical data for all unique UnderlyingTickers over the required date range.
        """
        # Extracting unique tickers and date range
        unique_tickers = self.data['UnderlyingTicker'].unique()
        start_date = self.data['Date'].min().strftime('%Y-%m-%d')
        end_date = (self.data['Date'].max() + pd.Timedelta(days=1)).strftime('%Y-%m-%d')    # Adding 1 day to end date

        print(f"Fetching data for {len(unique_tickers)} tickers from {start_date} to {end_date}...")

        # Fetching data in bulk
        self.ticker_data = yf.download(list(unique_tickers), start=start_date, end=end_date)

    def construct_index(self):
        """
        Constructs the time series of multiple custom indexes based on weighted returns.
        Uses merging and groupby for efficient calculations.
        """
        if self.ticker_data is None:
            raise ValueError("Ticker data not fetched. Call 'fetch_ticker_data' method first.")

        # Calculate daily returns for each ticker
        daily_returns = self.ticker_data['Close'].pct_change().iloc[1:]

        # Reshape daily_returns for merging
        daily_returns = daily_returns.stack().reset_index()
        daily_returns.columns = ['Date', 'UnderlyingTicker', 'Return']

        # Merge with the configuration data
        merged_data = pd.merge(self.data, daily_returns, on=['UnderlyingTicker', 'Date'])

        # Calculate weighted returns
        merged_data['WeightedReturn'] = merged_data['Return'] * merged_data['Weight']

        # Group by date and index, and sum the weighted returns
        index_series_df = merged_data.groupby(['Date', 'Index'])['WeightedReturn'].sum().unstack()

        self.returns = index_series_df

    def get_time_series(self, index_name):
        """
        Retrieves the time series for a given index.

        :param index_name: The name of the index to retrieve the time series for.
        :return: A time series (pandas Series) of the index values.
        """
        if self.index_series is None:
            raise ValueError("Index series not constructed. Call 'construct_index' method first.")

        return self.index_series

    def save_to_csv(self, file_path):
        """
        Saves the index time series to a CSV file.

        :param file_path: Path to the CSV file where the data will be saved.
        """
        if self.index_series is None:
            raise ValueError("Index series not constructed. Call 'construct_index' method first.")

        self.index_series.to_csv(file_path, header=True)

if __name__ == '__main__':
    # Example usage
    data = pd.DataFrame({
        'Date': pd.to_datetime(['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02']),
        'Index': ['CustomIndex1', 'CustomIndex1', 'CustomIndex1', 'CustomIndex1'],
        'SyntheticTicker': ['Synth1', 'Synth2', 'Synth1', 'Synth2'],
        'UnderlyingTicker': ['AAPL', 'MSFT', 'AAPL', 'MSFT'],
        'Weight': [0.5, 0.5, 0.6, 0.4]
    })

    file_path = 'path_to_your_file.csv'

    custom_index = CustomIndex()
    custom_index.load_data_from_csv(file_path)
    custom_index.fetch_ticker_data()
    custom_index.construct_index()
    print(custom_index.get_time_series('CustomIndex1'))
