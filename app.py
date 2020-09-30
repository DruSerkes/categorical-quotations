from flask import Flask, render_template
import os
import requests
from secrets import KEYNAME

app = Flask(__name__)
app.run()
app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY', KEYNAME)
BASE_URL = 'http://quotes.rest/'