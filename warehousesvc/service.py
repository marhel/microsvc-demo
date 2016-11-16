import os
from flask import Flask, request, jsonify, send_from_directory

app = Flask(__name__)

@app.route('/scripts/<path:path>')
def send_script(path):
    return send_from_directory('static/scripts', path)

@app.route('/views/<path:path>')
def send_view(path):
    return send_from_directory('static/views', path)

@app.route('/host')
def host():
    return jsonify(os.uname())

@app.route('/name')
def name():
    return jsonify("Python " + os.sys.version.split(" ")[0])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
