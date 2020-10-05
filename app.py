from flask import Flask, render_template, redirect, flash, request, url_for
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
    quote = get_todays_quote()
    if quote.get('message', False):
        flash(quote['message'], 'danger')
        return render_template('rate-limit.html', quote=quote)
    else:
        return render_template('index.html', quote=quote)


@app.route('/quotes', methods=['GET'])
def get_quote_by_category():
    """
    Gets quote by category and renders to user
    """
    category = request.args.get('category', False)
    if not category:
        return redirect(url_for('homepage'))
    else:
        quote = get_todays_quote(category)
        if quote.get('message', False):
            flash(quote['message'], 'danger')
            return render_template('rate-limit.html', quote=quote)
        else:
            return render_template('category.html', quote=quote)


@app.route('/favorites', methods=['GET'])
def show_favorite_list():
    """
    Show a list of user favorites
    """
    return render_template('favorites.html')
