from flask import Flask, request, render_template, session, flash, redirect, \
    url_for, jsonify

app = Flask(__name__)

@app.route('/staff')
def home():
    return render_template('staff.html')

@app.route('/user')
def user():
    return render_template('user.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)

