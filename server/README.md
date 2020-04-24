# Backend Server
This folder contains the Django backend for the invitation web app

## Initial Setup
Use following steps to setup the environment for the backend server:
* Create a python3 virtual environment: `virtualenv -p python3 .`
* Activate the environment: `. bin/activate`
* Install the requirements: `pip install -r requirements.txt`
* Go into app folder: `cd app`
* Set environment variables: `export DJANGO_SETTINGS_MODULE='app.settings'`
* Run DB migrations: `python manage.py migrate`
* Load data using fixtures: `python manage.py loaddata ./invites_data.json`

## Starting the Server
To start the server, please do the following: 
* Activate your virtual environment: `. bin/activate`
* Go into app folder: `cd app`
* Set environment variables: `export DJANGO_SETTINGS_MODULE='app.settings'`
* Start server: `python manage.py runserver`
