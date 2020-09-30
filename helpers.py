import requests
BASE_URL = 'http://quotes.rest/'


def get_todays_quote():
    response = requests.get(f'{BASE_URL}/qod')
    quote_data = response.json()
    return quote_data
