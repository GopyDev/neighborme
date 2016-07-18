NeighborMe
==========

The NeighborMe web application.

Getting Started
---------------

This application has been tested using Python 2.7.10

First, make sure that you have [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/) and virtualenvwrapper installed. Once you have those installed, created a virtual environment for this project. For example, you could do:

```shell
$ mkvirtualenv NeighborMe
```

To install the dependencies, run

```shell
$ pip install -r requirements.txt
$ npm install
```

Set up the database:

```shell
$ alembic upgrade head
```

To compile the Javascript files (which creates the module.js files), in a separate window run:

```shell
$ grunt
```

And finally you can run the web server by running

```shell
$ python run.py
```

You should see output similar to

```shell
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

Now just go into your web browser and navigate to the URL that appeared in the terminal to view the site!
