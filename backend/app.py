from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return jsonify({
        "message": "Your potential is limitless—go prove it to yourself."
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
