from flask import Flask, render_template
import os
import requests
from secrets import KEYNAME
from helpers import get_todays_quote

app = Flask(__name__)
app.run()
app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY', KEYNAME)


@app.route('/', methods=['GET'])
def homepage():
    """
    Home page - Gets quote of the day and renders it on a template
    """
    return render_template('index.html', quote='hello')
    # return render_template('index.html', quote=quote_data)
    # quote_data = get_todays_quote()
